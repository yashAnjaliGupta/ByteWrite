import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";
import { LoadingSkeleton } from "../components/LoadingSkeleton";
import { useEffect } from "react";
import { resetMetaTags } from "../utils/metaTags";

export function Blogs(){
    const {loading,blogs}=useBlogs();

    useEffect(() => {
        resetMetaTags();
    }, []);

    if(loading){
        return (<LoadingSkeleton/>)
    }
    return (<>
    <Appbar/>
    <div className="flex justify-center min-h-screen">
    {blogs.length===0 && <div className="text-gray-500 text-lg mt-10">No blogs found. Be the first to publish!</div>}
    <div >
        {blogs.map( (blog)=>
        <BlogCard
        id={blog.id}
        authorName={blog.author.name}
        title={blog.title}
        content={blog.content}
        publishedDate={blog.publishedate}/>
        )}
    </div>
        
    </div>
    </>)
};