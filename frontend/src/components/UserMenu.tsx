import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

interface UserMenuProps {
    username:string
}

export function UserMenu({username}:UserMenuProps){
    const [showMenu, setShowMenu] = useState(false);
    const menuRef=useRef<HTMLDivElement>(null);
    const navigate=useNavigate();
    const auth= useAuth();
    useEffect(()=>{
        const handleClickOutside=(e:MouseEvent)=>{
            if(menuRef.current && !menuRef.current.contains(e.target as Node)){
                setShowMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const handleLogout=()=>{
        localStorage.removeItem("token");
        console.log("logged out");
        auth?.logout()
        navigate("/signin");
    }
    return (
        <div className="relative inline-block" ref={menuRef}>
            <button
                onClick={() => setShowMenu(!showMenu)}
                className="cursor-pointer"
            >
                <Avatar name={username} />
            </button>
            
            {showMenu && (
                <div
    className="
        absolute
        right-0
        mt-3
        w-60
        overflow-hidden
        rounded-2xl
        border
        border-gray-200
        bg-white
        shadow-xl
        backdrop-blur
        animate-in
        fade-in
        zoom-in-95
        duration-100
        z-50
    "
>

    {/* Header */}
    <div className="border-b border-gray-100 px-4 py-4">

        <div className="text-sm text-gray-500">
            Signed in as
        </div>

        <div className="mt-1 truncate font-semibold text-gray-900">
            {username}
        </div>

    </div>

    {/* Navigation */}
    <div className="p-2">

        <Link to="/me">

            <div
                className="
                    flex
                    items-center
                    rounded-xl
                    px-4
                    py-3
                    text-sm
                    font-medium
                    text-gray-700
                    transition-all
                    duration-150
                    hover:bg-gray-100
                    hover:text-black
                "
            >
                My Profile
            </div>

        </Link>

        <Link to="/myblogs">

            <div
                className="
                    flex
                    items-center
                    rounded-xl
                    px-4
                    py-3
                    text-sm
                    font-medium
                    text-gray-700
                    transition-all
                    duration-150
                    hover:bg-gray-100
                    hover:text-black
                "
            >
                My Blogs
            </div>

        </Link>

        <Link to="/settings">

            <div
                className="
                    flex
                    items-center
                    rounded-xl
                    px-4
                    py-3
                    text-sm
                    font-medium
                    text-gray-700
                    transition-all
                    duration-150
                    hover:bg-gray-100
                    hover:text-black
                "
            >
                Settings
            </div>

        </Link>

    </div>

    {/* Footer */}
    <div className="border-t border-gray-100 p-2">

        <button
            onClick={handleLogout}
            className="
                flex
                w-full
                items-center
                rounded-xl
                px-4
                py-3
                text-sm
                font-medium
                text-red-600
                transition-all
                duration-150
                hover:bg-red-50
            "
        >
            Logout
        </button>

    </div>

</div>
            )}
        </div>
    )
}