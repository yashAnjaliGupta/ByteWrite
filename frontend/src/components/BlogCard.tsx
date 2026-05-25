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
});


export function BlogCard({
    id,
    authorName,
    title,
    content,
    publishedDate}:BlogCardProps){
    console.log(content)
    return (
    <Link to={`/blog/${id}`}>

    <article
        className="
            w-full
            cursor-pointer
            border-b
            border-gray-200
            px-4
            py-5
            transition-all
            duration-200
            hover:bg-gray-50
            sm:px-6
        "
    >

        <div className="mx-auto w-full max-w-4xl">

            {/* Author Row */}
            <div className="flex flex-wrap items-center gap-2 text-sm">

                <div className="flex items-center">
                    <Avatar name={authorName} />
                </div>

                <span className="font-medium text-gray-800">
                    {authorName}
                </span>

                <span className="text-gray-400">
                    •
                </span>

                <span className="text-gray-500">
                    {formattedDate(publishedDate)}
                </span>
            </div>

            {/* Title */}
            <h2
                className="
                    mt-3
                    line-clamp-2
                    text-xl
                    font-bold
                    leading-snug
                    text-gray-900
                    sm:text-2xl
                "
            >
                {title}
            </h2>

            {/* Content Preview */}
            <p
                className="
                    mt-3
                    line-clamp-3
                    text-sm
                    leading-7
                    text-gray-600
                    sm:text-base
                "
            >
                {content.slice(0, 180)}...
            </p>

        </div>

    </article>

</Link>);
}

export function AvatarText(name:string):string {
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] || "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
}
export function Avatar({name}:{name:string}){
    
    return (
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-slate-200 rounded-full">
            <span className="font-medium text-body">{AvatarText(name)}</span>
        </div>
    )
}