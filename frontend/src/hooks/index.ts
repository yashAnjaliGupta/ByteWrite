import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Blog{
    content:string,
    title: string,
    published: boolean,
    id: string,
    publishedate: string,
    author: {
        name: string
    }
}

export const useBlog =(id:string|undefined)=>{
    const [loading,setLoading]= useState(true);
    const [blog,setBlog]=useState<Blog>();

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/v1/api/publicblogs/${id}`,{
            headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
            }
        })
        .then(response=>{
            setBlog(response.data.blog)
            setLoading(false);
        })
    },[])
    return {
        loading, blog
    }
}

export const useBlogs =()=>{
    const [loading,setLoading]= useState(true);
    const [blogs,setBlogs]=useState<Blog[]>([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/v1/api/publicblogs`)
        .then(response=>{
            setBlogs(response.data)
            setLoading(false);
        })
    },[])
    return {
        loading, blogs
    }
}

export const useMyBlogs =()=>{
    const [loading,setLoading]= useState(true);
    const [blogs,setBlogs]=useState<Blog[]>([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/v1/api/blogs/myblogs`,{
            headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
            }
        })
        .then(response=>{
            setBlogs(response.data)
            setLoading(false);
        })
    },[])
    return {
        loading, blogs
    }
}
