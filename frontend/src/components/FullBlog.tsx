import type { Blog } from "../hooks";
import { formattedDate } from "./BlogCard";
import { Avatar } from "./BlogCard";
import { BlogViewer } from "./BlogViwer";

export function FullBlog({blog}:{blog:Blog}){
    const content=JSON.parse(blog.content)
    console.log(typeof(blog.content))
    console.log(content);
    console.log(typeof(content));
    

    return (<div className="grid grid-cols-12 px-15 w-full pt-20">
        <div className="col-span-9">
            <div className="text-3xl font-extrabold">
                {blog.title}
            </div>
            <div className="text-slate-500 pt-2">
                Posted on {formattedDate(blog.publishedate)}
            </div>
            <div className="pt-4 ">
                <BlogViewer content={content}/>
            </div>
        </div>
        <div className="border-l border-slate-400  col-span-3 pl-2">
            <div className="flex">
            <div className="justify-center flex-col">
                <Avatar name={blog.author.name}/>
            </div>
            <div className="font-extralight pl-2 pt-2">
                {blog.author.name}
            </div>
            </div>
        </div>
    </div>)
}