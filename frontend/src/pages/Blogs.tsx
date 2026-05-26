import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";
import { LoadingSkeleton } from "../components/LoadingSkeleton";

export function Blogs(){
    const {loading,blogs}=useBlogs();

    if(loading){
        return (<LoadingSkeleton/>)
    }
    return (<>
    <Appbar/>
    <div className="flex justify-center">
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