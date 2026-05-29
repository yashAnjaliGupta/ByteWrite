import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode,sign,verify } from "hono/jwt";
import {z} from "zod";
import {generatePreview} from "../utils"
import { AwsClient } from "aws4fetch"

const createBlogBody=z.object({
    title: z.string().min(5),
    content:z.string()
})
const updateBlogBody = z.object({
    id:z.string(),
    title: z.string().min(5),
    content:z.string()
})

const blogs= new Hono<{ 
    Bindings: {
        ACCELERATE_URL: string,
        JWT_Secret: string,
        AWS_ACCESS_KEY_ID: string,
        AWS_SECRET_ACCESS_KEY: string,
        AWS_BUCKET_NAME: string,
        AWS_REGION: string
    };
    Variables: {
        userid: string;
    }; }>();

blogs.use("/*",async (c,next)=>{
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

blogs.post("/",async (c)=>{
    const body= await c.req.json();
    const prisma = new PrismaClient({
        accelerateUrl: c.env.ACCELERATE_URL,
    }).$extends(withAccelerate());
    const {success}= createBlogBody.safeParse(body);
    if(!success){
        return c.json({ message: "Incorrect Input" }, 409);
    }
    const authorID=c.get('userid')
    try{
        const blog= await prisma.post.create({
            data: {
                title:body.title,
                content:body.content,
                authorId: authorID
            }
        })
        return c.json({
            id:blog.id
        },200)
    }catch(e){
        return c.json({
            error:e
        },401)
    }
    
})
blogs.put("/",async (c)=>{
    const body= await c.req.json();
    const prisma = new PrismaClient({
        accelerateUrl: c.env.ACCELERATE_URL,
    }).$extends(withAccelerate());
    const {success}= updateBlogBody.safeParse(body);
    if(!success){
        return c.json({ message: "Incorrect Input" }, 409);
    }
    try{
        const blog= await prisma.post.update({
            where:{
                id:body.id,
                isDeleted:false
            },
            data: {
                title:body.title,
                content:body.content,
            }
        })
        return c.json({
            id:blog.id
        },200)
    }catch(e){
        return c.json({
            error:e
        },401)
    }
    
})
blogs.patch("/",async (c)=>{
    const body= await c.req.json();
    const prisma = new PrismaClient({
        accelerateUrl: c.env.ACCELERATE_URL,
    }).$extends(withAccelerate());
    try{
        const blog= await prisma.post.update({
            where:{
                id:body.id,
                isDeleted:false
            },
            data: {
                published: body.published
            }
        })
        return c.json({
            id:blog.id
        },200)
    }catch(e){
        return c.json({
            error:e
        },401)
    }
    
})
blogs.get("/myblogs",async (c)=>{
    const authorID=c.get('userid')
    const prisma = new PrismaClient({
        accelerateUrl: c.env.ACCELERATE_URL,
    }).$extends(withAccelerate());

    try{
        const blogs= await prisma.post.findMany({
            select:{
                content:true,
                title:true,
                published:true,
                id:true,
                publishedate:true,
                author:{
                    select:{
                        name:true
                    }
                }
            },
            where:{
                authorId:authorID,
                isDeleted:false
            }
        })
        const blogsPreview = blogs.map((blog) => ({
            ...blog,
            content: generatePreview(blog.content, 150)
        }))
        return c.json(blogsPreview,200);
    }catch(e){
        return c.json({
            error:e
        },401)
    }
})
blogs.delete("/:id",async (c)=>{
    const postid=c.req.param('id')
    const authorID=c.get('userid')  
    const prisma = new PrismaClient({
        accelerateUrl: c.env.ACCELERATE_URL,
    }).$extends(withAccelerate());
    try{
        await prisma.post.updateMany({
            where:{
                id:postid,
                authorId:authorID,
                isDeleted:false
            },
            data:{
                isDeleted:true
            }
            
        })
        return c.json({
            message:"Deleted Successfully"
        },200)
    }catch(e){
        return c.json({
            error:e
        },401)
    }
});
blogs.post("/generate-upload-url",async (c)=>{
    const authorID=c.get('userid')
    const body= await c.req.json();
    const contentType = body.contentType;
    if (!contentType.startsWith("image/")) {
        return c.json({
            error: "Only images allowed"
        }, 400)
    }
    const extension = contentType.split("/")[1]; // e.g., "image/jpeg" -> "jpeg"
    const key = `users/${authorID}/${crypto.randomUUID()}.${extension}`;
    try{
        const aws = new AwsClient({
            region: c.env.AWS_REGION,
            accessKeyId: c.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: c.env.AWS_SECRET_ACCESS_KEY,
            service: "s3"
        });
        const url =`https://${c.env.AWS_BUCKET_NAME}.s3.${c.env.AWS_REGION}.amazonaws.com/${key}`
        const signedRequest = await aws.sign(
            new Request(url, {
                method: "PUT",
                headers: {
                    "Content-Type": contentType
                }
            }),{
                aws: {
                    signQuery: true,
                }
            }
        )
        return c.json({
            uploadURL: signedRequest.url,
            imageURL: url,
            key:key
        },200)
    }catch(e){
        console.log(e);
        return c.json({
            error:e
        },401)
    }
})


export default blogs;