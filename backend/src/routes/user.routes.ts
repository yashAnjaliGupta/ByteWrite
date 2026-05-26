import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode,sign,verify } from "hono/jwt";
import bcrypt from 'bcryptjs'
import {z} from "zod";
import {Resend} from "resend";

const users= new Hono<{ 
    Bindings: {
        ACCELERATE_URL: string,
        JWT_Secret: string,
        RESEND_API_KEY: string,
        KV: KVNamespace
    };
    Variables: {
        userid: string;
    };  
}>();



const signupBody=z.object({
    name: z.string().min(5),
    email:z.email(),
    password:z.string().min(8),
    otp:z.string().length(6)
})
const signinBody = z.object({
    email:z.email(),
    password:z.string().min(8)
})
users.post("/signup",async (c)=>{
    const prisma = new PrismaClient({
    accelerateUrl: c.env.ACCELERATE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    console.log(body,"before parsing");
    const {success}= signupBody.safeParse(body);
    if(!success){
        return c.json({ message: "Incorrect Input" }, 409);
    }
    try{
        const user= await prisma.user.findUnique({
            where:{
                email:body.email
            }
        });
        if(user){
            return c.json({ message: "User already exist" }, 409);
        }
        const hashedPassword=await bcrypt.hash(body.password,5);
         await c.env.KV.get(`otp:${body.email}`).then((otp)=>{
            if(otp!==null){
                if(otp!==body.otp){
                    return c.json({ message: "Invalid OTP" }, 401);
                }
            }else{
                return c.json({ message: "OTP not found" }, 404);
            }
        });
        const createdUser=await prisma.user.create({
            data:{
                name: body.name,
                email:body.email,
                password: hashedPassword
            }
        });
        const token =await sign({id:createdUser.id},c.env.JWT_Secret,"HS256");
        return c.json({jwt:token},200);
    }catch(e){
        return c.json({error:e},409)
    }
})
users.post("/signin",async (c)=>{
    const prisma = new PrismaClient({
    accelerateUrl: c.env.ACCELERATE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const {success}= signinBody.safeParse(body);
    if(!success){
        return c.json({ message: "Incorrect Input" }, 409);
    }
    try{
        const user= await prisma.user.findUnique({
            where:{
                email:body.email,
            }
        });
        if(!user){
            return c.json({ message: "User does'not exits" }, 404);
        }
        const isCorrectPassword = await bcrypt.compare(body.password,user.password);
        if(!isCorrectPassword){
            return c.json({ message: "Incorrect password" }, 401);
        }
        const token =await sign({id:user.id},c.env.JWT_Secret,"HS256");
        return c.json({jwt:token},200);
    }catch(e){
        return c.json({error:e},409)
    }
    
})
users.use("/me/*",async (c,next)=>{
    const header = c.req.header("authorization")||"";
    // Bearer token
    const token=header.split(" ")[1];
    if(!token){
        c.status(403)
        return c.json({error:"Unauthorized"});
    }
    try{
        const response= await verify(token,c.env.JWT_Secret,"HS256");
        if(response.id){
            c.set("userid",String(response.id));
            await next()
        }else{
            c.status(403)
            return c.json({error:"Unauthorized"});
        }
    }
    catch(e){
        c.status(403)
        return c.json({error:"Unauthorized"});
    }
})
users.get("/me",async (c)=>{
    const prisma = new PrismaClient({
    accelerateUrl: c.env.ACCELERATE_URL,
    }).$extends(withAccelerate())
    const userId=c.get("userid")
    const User = await prisma.user.findUnique({
        where:{
            id: userId
            }
    });        
    return c.json({ username: User?.name,description: User?.description}, 200);

})
users.put("/me",async(c)=>{
    const authorID=c.get('userid')
    const body= await c.req.json();
    const prisma = new PrismaClient({
        accelerateUrl: c.env.ACCELERATE_URL,
    }).$extends(withAccelerate());
    try{
        const user= await prisma.user.update({
            where:{
                id:authorID,
            },
            data: {
                name:body.name,
                description:body.description
            }
        })
        return c.json({
            id:user.id
        },200)
    }catch(e){
        return c.json({
            error:e
        },401)
    }
})

users.put("/me/password",async(c)=>{
    const authorID=c.get('userid')
    const body= await c.req.json();
    const prisma = new PrismaClient({
        accelerateUrl: c.env.ACCELERATE_URL,
    }).$extends(withAccelerate());
    try{
        let user= await prisma.user.findUnique({
            where:{
                id:authorID
            }
        });
        if(!user){
            return c.json({ message: "User does'not exits" }, 404);
        }
        const isCorrectPassword = await bcrypt.compare(body.currentPassword,user.password);
        if(!isCorrectPassword){
            return c.json({ message: "Incorrect password" }, 401);
        }
        const hashedPassword=await bcrypt.hash(body.newPassword,5);
        user= await prisma.user.update({
            where:{
                id:authorID,
            },
            data: {
                password:hashedPassword
            }
        })
        return c.json({
            id:user.id
        },200)
    }catch(e){
        return c.json({
            error:e
        },401)
    }
})
users.post("/sendotp", async (c) => {
    const body = await c.req.json()
    const email = body.email
    const resend = new Resend(c.env.RESEND_API_KEY);
    const otp = Math.floor(
        100000 + Math.random() * 900000
    ).toString()
    // Store in KV for 5 mins
    await c.env.KV.put(
        `otp:${email}`,
        otp,
        {
            expirationTtl: 600
        }
    )
    try{
        const response = await resend.emails.send({
                from: "support@yashguptaiiit.in",
                to: email,
                subject: "Welcome to ByteWrite",
                html: `
                <div
                    style="
                        background:#f5f7fb;
                        padding:40px 20px;
                        font-family:Inter,Arial,sans-serif;
                    "
                >

                    <div
                        style="
                            max-width:520px;
                            margin:auto;
                            background:white;
                            border-radius:16px;
                            padding:40px;
                            border:1px solid #e5e7eb;
                        "
                    >

                        <div
                            style="
                                font-size:28px;
                                font-weight:700;
                                color:#111827;
                                margin-bottom:10px;
                            "
                        >
                            ByteWrite
                        </div>

                        <div
                            style="
                                font-size:18px;
                                font-weight:600;
                                color:#111827;
                                margin-bottom:20px;
                            "
                        >
                            Verify your email
                        </div>

                        <p
                            style="
                                color:#4b5563;
                                line-height:1.7;
                                font-size:15px;
                                margin-bottom:30px;
                            "
                        >
                            Use the verification code below to continue logging in to your ByteWrite account.
                        </p>

                        <div
                            style="
                                background:#111827;
                                color:white;
                                font-size:32px;
                                font-weight:700;
                                letter-spacing:8px;
                                text-align:center;
                                padding:18px;
                                border-radius:14px;
                                margin-bottom:30px;
                            "
                        >
                            ${otp}
                        </div>

                        <p
                            style="
                                color:#6b7280;
                                font-size:14px;
                                line-height:1.6;
                                margin-bottom:8px;
                            "
                        >
                            This OTP is valid for 10 minutes.
                        </p>

                        <p
                            style="
                                color:#9ca3af;
                                font-size:13px;
                                line-height:1.6;
                            "
                        >
                            If you did not request this code, you can safely ignore this email.
                        </p>

                    </div>

                </div>
                `
        })
        return c.json({
                success: true,
                response
        })
    }
    catch(e){
        return c.json({
            success: false,
            error: e
        },500)
    }
})

export default users;