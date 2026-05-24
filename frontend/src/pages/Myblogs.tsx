import { Appbar } from "../components/Appbar";
import { MyBlogCard } from "../components/MyBlogCard";
import { useMyBlogs } from "../hooks";

export function MyBlogs(){
    const {loading,blogs}=useMyBlogs();

    if(loading){
        return (<div>loading.....</div>)
    }
    return (<>
    <Appbar/>
    <div className="flex justify-center">
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