import { Avatar } from "./BlogCard";
import { Link } from "react-router";
import { useAuth } from "../Auth";
export function Appbar(){
    const auth = useAuth(); 
    const username = auth?.username || "";

    return (
        <div className=" border-b flex justify-between px-10 py-4">
            <div className="flex justify-center flex-col">
                TechTalk
            </div>
            <div>
                <Link to={`/publish`}>
                {auth?.isAuthenticated && <button
                type="button"
                className="mr-4 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none">
                New
                </button>}
                </Link>
                <Avatar name={username} />
            </div>
        </div>
    )
}