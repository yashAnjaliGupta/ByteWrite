import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode,sign,verify } from "hono/jwt";
import {z} from "zod";

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
        JWT_Secret: string};
    Variables: {
        userid: string;
    }; }>();

blogs.use("/*",async (c,next)=>{
    const header = c.req.header("authorization")||"";
    // Bearer token
    const token=header.split(" ")[1];

    const response= await verify(token,c.env.JWT_Secret,"HS256");
    if(response.id){
        c.set("userid",String(response.id));
        await next()
    }else{
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
                id:body.id
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
blogs.get("/",async (c)=>{
    const authorID=c.get('userid')
    const prisma = new PrismaClient({
        accelerateUrl: c.env.ACCELERATE_URL,
    }).$extends(withAccelerate());

    try{
        const blogs= await prisma.post.findMany({
            where:{
                authorId:authorID
            }
        })
        return c.json(blogs,200);
    }catch(e){
        return c.json({
            error:e
        },401)
    }
})
blogs.get("/:id",async (c)=>{
    const prisma = new PrismaClient({
        accelerateUrl: c.env.ACCELERATE_URL,
    }).$extends(withAccelerate());
    try{
        const postid=c.req.param('id')
        const blog= await prisma.post.findFirst({
            where:{
                id:postid
            }
        })
        return c.json({
            blog
        },200)
    }catch(e){
        return c.json({
            error:e
        },401)
    }
    
})


export default blogs;