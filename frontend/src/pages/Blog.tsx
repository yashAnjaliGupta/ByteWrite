import { Appbar } from "../components/Appbar"
import { useParams } from "react-router"
import { useBlog } from "../hooks";
import { FullBlog } from "../components/FullBlog";
import { LoadingSkeleton } from "../components/LoadingSkeleton";

export function Blog(){
    let params=useParams();
    const {loading,blog}=useBlog(params.id);
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