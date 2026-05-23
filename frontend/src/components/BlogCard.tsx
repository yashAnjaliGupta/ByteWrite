import { Link } from "react-router"

interface BlogCardProps{
    id:string,
    authorName:string,
    title:string,
    content:string
    publishedDate:string
}

export const formattedDate =(date:string)=> new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
});


export function BlogCard({
    id,
    authorName,
    title,
    content,
    publishedDate}:BlogCardProps){
    
    return (
    <Link to={`/blog/${id}`}>
    <div className="border-b border-slate-400 p-4 max-w-5xl min-w-xl  cursor-pointer">
        <div className="flex">
            <div className="flex justify-center flex-col">
                <Avatar name={authorName}/>
            </div>
            <div className="font-extralight pl-2 flex justify-center flex-col">
                {authorName}
            </div>
            <div className="pl-2 text-sm font-thin font-slate-200 flex justify-center flex-col">
                .   {formattedDate(publishedDate)}
            </div>
        </div>
        <div className=" pt-2 text-xl font-semibold">
            {title}
        </div>
        <div className="text-md font-thin">
            {content.slice(0,100)+"......"}
        </div>
    </div>
    </Link>);
}

export function Avatar({name}:{name:string}){
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] || "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";

    return (
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-slate-200 rounded-full">
            <span className="font-medium text-body">{(first + last).toUpperCase()}</span>
        </div>
    )
}