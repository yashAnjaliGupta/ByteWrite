import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode,sign,verify } from "hono/jwt";
import bcrypt from 'bcryptjs'
import {z} from "zod";

const users= new Hono<{ Bindings: {ACCELERATE_URL: string,JWT_Secret: string} }>();

const signupBody=z.object({
    name: z.string().min(5),
    email:z.email(),
    password:z.string().min(8)
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
    console.log(body,"after Parsing");
    console.log(c.env.ACCELERATE_URL);
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

export default users;