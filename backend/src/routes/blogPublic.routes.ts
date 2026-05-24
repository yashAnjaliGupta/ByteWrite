import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode,sign,verify } from "hono/jwt";
import {z} from "zod";

const blogsPublic= new Hono<{ 
    Bindings: {
        ACCELERATE_URL: string,
        JWT_Secret: string};
    Variables: {
        userid: string;
    }; }>();

blogsPublic.get("/",async (c)=>{
    const prisma = new PrismaClient({
        accelerateUrl: c.env.ACCELERATE_URL,
    }).$extends(withAccelerate());

    try{
        const blogs= await prisma.post.findMany({
            where:{
                published:true
            },
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
            }
        })
        return c.json(blogs,200);
    }catch(e){
        return c.json({
            error:e
        },401)
    }
})
blogsPublic.get("/:id",async (c)=>{
    const prisma = new PrismaClient({
        accelerateUrl: c.env.ACCELERATE_URL,
    }).$extends(withAccelerate());
    try{
        const postid=c.req.param('id')
        const blog= await prisma.post.findFirst({
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

export default blogsPublic;