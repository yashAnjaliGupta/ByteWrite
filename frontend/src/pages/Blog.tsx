import { Appbar } from "../components/Appbar"
import { useParams } from "react-router"
import { useBlog } from "../hooks";
import { FullBlog } from "../components/FullBlog";
import { LoadingSkeleton } from "../components/LoadingSkeleton";
import { useEffect } from "react";
import { updateMetaTags, resetMetaTags } from "../utils/metaTags";
import { SITE_URL } from "../config";

export function Blog(){
    let params=useParams();
    const {loading,blog}=useBlog(params.id);
    
    useEffect(() => {
        if (blog && !loading) {
            // Extract preview from content
            let preview = "Read this amazing blog on ByteWrite";
            try {
                const contentJSON = JSON.parse(blog.content);
                const words: string[] = [];
                
                function extractText(node: any) {
                    if (!node || words.length >= 150) return;
                    
                    if (node.type === "text" && node.text) {
                        const splitWords = node.text
                            .replace(/\s+/g, " ")
                            .trim()
                            .split(" ")
                        
                        for (const word of splitWords) {
                            if (words.length >= 150) break;
                            if (word.trim()) words.push(word)
                        }
                    }
                    
                    if (node.content && Array.isArray(node.content)) {
                        for (const child of node.content) {
                            if (words.length >= 150) break;
                            extractText(child)
                        }
                    }
                }
                
                extractText(contentJSON);
                preview = words.join(" ") + (words.length >= 150 ? "..." : "");
            } catch (e) {
                // Keep default preview
            }

            const blogUrl = `${SITE_URL}/blog/${blog.id}`;
            
            updateMetaTags({
                title: blog.title,
                description: preview,
                image: `https://og-image.vercel.app/${encodeURIComponent(blog.title.substring(0, 60))}.png?theme=dark&md=1&fontSize=120px`,
                url: blogUrl,
                author: blog.author?.name,
                publishedDate: blog.publishedate,
            });
        } else if (loading === false && !blog) {
            resetMetaTags();
        }

        return () => {
            resetMetaTags();
        };
    }, [blog, loading]);

    if(loading){
        return (<div>
            <LoadingSkeleton/>
        </div>)
    }
    return (<div>
        <Appbar/>
        {blog && <FullBlog blog={blog}/>}
    </div>)
};