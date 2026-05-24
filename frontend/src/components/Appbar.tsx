import { Link } from "react-router";
import { useAuth } from "../Auth";
import { UserMenu } from "./UserMenu";

export function Appbar(){
    const auth = useAuth(); 
    const username = auth?.username ||"";

    return (
        <div className=" border-b flex justify-between px-10 py-4">
            <Link to="/">
            <div className="flex justify-center items-center">
                Byte<span className="font-bold text-xl ml-1">Write</span>
            </div>
            </Link>
            <div>
                {auth?.isAuthenticated? <>
                <Link to={`/publish`}>
                <button
                type="button"
                className="mr-4 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>

                </button>
                </Link>
                <UserMenu username={username}/>
                </>:
                <Link to="/signin">
                <button
                type="button"
                className="mr-4 text-white bg-gray-900 hover:bg-gray-700 focus:ring-gray-4 focus:ring-gray shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none">
                Sign in
                </button>
                </Link>}
            </div>
        </div>
    )
}