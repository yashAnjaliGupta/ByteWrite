import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

interface UserMenuProps {
    username:string
}

export function UserMenu({username}:UserMenuProps){
    const [showMenu, setShowMenu] = useState(false);
    const menuRef=useRef<HTMLDivElement>(null);
    const navigate=useNavigate();

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
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <Link to="/myblogs">
                        <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            My Blogs
                        </div>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 border-t border-gray-200"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    )
}