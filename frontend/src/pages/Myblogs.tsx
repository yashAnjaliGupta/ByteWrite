import { Appbar } from "../components/Appbar";
import { LoadingSkeleton } from "../components/LoadingSkeleton";
import { MyBlogCard } from "../components/MyBlogCard";
import { useMyBlogs } from "../hooks";

export function MyBlogs(){
    const {loading,blogs}=useMyBlogs();

    if(loading){
        return (<LoadingSkeleton/>)
    }
    return (<>
    <Appbar/>
    <div className="flex justify-center min-h-screen">
    {blogs.length===0 && <div className="text-gray-500 text-lg mt-10">You haven't published any blogs yet. Start writing your first blog!</div>}
    <div >
        {blogs.map( (blog)=>
        <MyBlogCard
            id={blog.id}
            authorName={blog.author.name}
            title={blog.title}
            content={blog.content}
            publishedDate={blog.publishedate}
            published={blog.published}/>
        )}
    </div>
        
    </div>
    </>)
};