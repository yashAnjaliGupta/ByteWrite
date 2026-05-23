import axios from 'axios';
import { SimpleEditor } from '../editor/components/tiptap-templates/simple/simple-editor'
import { useState,useEffect } from 'react'
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router';

export function Publish() {
    const navigate=useNavigate();
    const [content, setContent] = useState("");
    const [title,setTitle]=useState("");
    const [isFullscreen, setIsFullscreen] = useState(false)
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsFullscreen(false)
            }
        }

        window.addEventListener("keydown", handleEsc)

        return () => {
            window.removeEventListener("keydown", handleEsc)
        }
    }, [])

    async function publish(){
        const response=await axios.post(`${BACKEND_URL}/v1/api/blogs`,{
            title,
            content
        },{
            headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
            }
        })
        console.log(response.data);
        navigate(`/blog/${response.data.id}`)
    }

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-5">
            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <div className='flex justify-between'>
                    <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Create a new post
                    </h1>
                    <p className="mt-2 text-gray-500">
                        Share your thoughts, ideas and stories with the world.
                    </p>
                </div>
                <div>
                <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="
                        rounded-full
                        border
                        border-gray-200
                        px-4
                        py-2
                        text-sm
                        font-medium
                        hover:bg-gray-100
                        mr-2
                    "
                >
                    {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                </button>
                <button
                    onClick={publish}
                    className=" mt-3 h-10 rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800">
                    Publish
                </button>
                </div>
                </div>
                {/* Main Editor Card */}
                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

                    {/* Content */}
                    <div className="p-6">

                        {/* Title Input */}
                        <div className="mb-8">
                            <label className="mb-3 block text-sm font-semibold text-gray-700">
                                Title
                            </label>

                            <textarea
                                value={title}
                                onChange={(e)=>{
                                    setTitle(e.target.value)
                                }}
                                placeholder="Enter an engaging title..."
                                rows={2}
                                className="
                                    w-full
                                    resize-none
                                    border-0
                                    border-b
                                    border-gray-200
                                    bg-transparent
                                    pb-4
                                    text-3xl
                                    font-bold
                                    text-gray-900
                                    placeholder:text-gray-300
                                    focus:border-black
                                    focus:outline-none
                                    focus:ring-0
                                "
                            />
                        </div>

                        {/* Editor */}
                        <div className={`rounded-2xl border border-black-200 bg-white
                            ${
                            isFullscreen
                                ? "fixed inset-0 z-[100] overflow-y-auto p-10"
                                : "rounded-3xl p-8 shadow-sm"
        }
    }`}>
                            <SimpleEditor 
                            content= {content}
                            onChange={setContent}/>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}