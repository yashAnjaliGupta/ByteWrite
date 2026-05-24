import { Link, useNavigate } from "react-router"
import { Avatar } from "./BlogCard";
import { formattedDate } from "./BlogCard";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface MyBlogCardProps{
    id:string,
    authorName:string,
    title:string,
    content:string
    publishedDate:string
    published: boolean
    onDelete?: (id: string) => void;
}


export function MyBlogCard({
    id,
    authorName,
    title,
    content,
    publishedDate,
    published,
    onDelete
}:MyBlogCardProps){
    const navigate = useNavigate();
    const [isPublished, setIsPublished] = useState(published);
    const [loading, setLoading] = useState(false);
    const handleTogglePublish = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        const newStatus = !isPublished;
        try {
            await axios.patch(`${BACKEND_URL}/v1/api/blogs`, {
                id,
                published: newStatus
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            setIsPublished(newStatus);
            // navigate(`/blog/${id}`);
        } catch (err) {
            console.error("Error toggling publish:", err);
        }
        setLoading(false);
    };

    const handleEdit = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate(`/publish/${id}`);
    };

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete this blog?")) {
            try {
                await axios.delete(`${BACKEND_URL}/v1/api/blogs/${id}`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                onDelete?.(id);
            } catch (err) {
                console.error("Error deleting blog:", err);
            }
        }
    };

return (
    <div className="border-b border-slate-400 p-4 max-w-5xl min-w-xl">
        <div className="flex justify-between items-start gap-4">
            {/* Content - Left Side */}
            <Link to={`/blog/${id}`} className="flex-1 min-w-0">
                <div className="cursor-pointer hover:bg-gray-50 p-2 rounded">
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
            </Link>

            {/* Action Buttons - Right Side */}
            <div className="flex gap-3 items-center flex-shrink-0">
                <label className="flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={isPublished}
                        onChange={handleTogglePublish}
                        disabled={loading}
                        className="sr-only"
                    />
                    <div className={`relative w-12 h-6 rounded-full transition-colors ${
                        isPublished ? "bg-green-600" : "bg-gray-300"
                    } ${loading ? "opacity-50" : ""}`}>
                        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                            isPublished ? "translate-x-6" : "translate-x-0"
                        }`}></div>
                    </div>
                </label>

                {/* Edit Button - Circular */}
                <button
                    onClick={handleEdit}
                    className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition text-gray-700"
                    title="Edit"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>

                </button>

                {/* Delete Button - Circular */}
                <button
                    onClick={handleDelete}
                    className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition text-gray-700"
                    title="Delete"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>

                </button>
            </div>
        </div>
    </div>
);
}