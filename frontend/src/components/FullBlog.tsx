import type { Blog } from "../hooks";
import { formattedDate } from "./BlogCard";
import { Avatar } from "./BlogCard";
import { BlogViewer } from "./BlogViwer";
import { ShareSection } from "./ShareSection";

export function FullBlog({blog}:{blog:Blog}){
    const content=JSON.parse(blog.content)

    return (<div className="w-full px-4 pt-10 sm:px-8 lg:px-16">

    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12">

        {/* Main Content */}
        <div className="lg:col-span-8">

            {/* Title */}
            <h1
                className="
                    text-3xl
                    font-extrabold
                    leading-tight
                    text-gray-900
                    sm:text-4xl
                    lg:text-5xl
                "
            >
                {blog.title}
            </h1>

            {/* Date */}
            <div className="pt-4 text-sm text-gray-500 sm:text-base">
                Posted on {formattedDate(blog.publishedate)}
            </div>

            {/* Mobile Author */}
            <div
                className="
                    mt-6
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-gray-200
                    bg-gray-50
                    p-4
                    lg:hidden
                "
            >
                <Avatar name={blog.author.name} />

                <div>
                    <div className="text-sm text-gray-500">
                        Author
                    </div>

                    <div className="font-semibold text-gray-900">
                        {blog.author.name}
                    </div>
                </div>
            </div>

            {/* Blog Content */}
            <div className="pt-8">
                <BlogViewer content={content} />
            </div>

            {/* Share Section */}
            <ShareSection blogId={blog.id} title={blog.title} />
        </div>

        {/* Desktop Author Sidebar */}
        <div
            className="
                hidden
                border-l
                border-gray-200
                pl-8
                lg:col-span-4
                lg:block
            "
        >
            
            <div className="sticky top-24">

                <div className="mb-4 text-sm font-medium uppercase tracking-wide text-gray-400">
                    Author
                </div>

                <div className="flex items-center gap-4">

                    <Avatar name={blog.author.name} />

                    <div>
                        <div className="text-lg font-semibold text-gray-900">
                            {blog.author.name}
                        </div>

                        <div className="text-sm text-gray-500">
                            Writer at ByteWrite
                        </div>
                    </div>

                </div>
            </div>

        </div>

    </div>

</div>)
}