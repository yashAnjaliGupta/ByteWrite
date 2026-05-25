import { Link } from "react-router";
import { useAuth } from "../AuthContext";
import { UserMenu } from "./UserMenu";

export function Appbar(){
    const auth = useAuth(); 
    const username = auth?.username ||"";

    return (
        <div className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur">
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
            to="/"
            className="group flex items-center"
        >
            <div className="text-2xl font-light tracking-tight text-gray-900">
                Byte
                <span className="ml-1 font-bold transition-colors group-hover:text-slate-600">
                    Write
                </span>
            </div>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-4">

            {auth?.isAuthenticated ? (
                <>
                    <Link to="/publish">

                        <button
                            type="button"
                            className="
                                rounded-full
                                bg-green-600
                                px-5
                                py-2
                                text-sm
                                font-medium
                                text-white
                                shadow-sm
                                transition-all
                                duration-200
                                hover:bg-green-700
                                hover:shadow-md
                                focus:outline-none
                                focus:ring-4
                                focus:ring-green-200
                            "
                        >
                            New Post
                        </button>

                    </Link>

                    <div className="flex items-center">
                        <UserMenu username={username} />
                    </div>
                </>
            ) : (
                <Link to="/signin">

                    <button
                        type="button"
                        className="
                            rounded-full
                            border
                            border-gray-300
                            bg-white
                            px-5
                            py-2
                            text-sm
                            font-medium
                            text-gray-700
                            transition-all
                            duration-200
                            hover:border-gray-400
                            hover:bg-gray-50
                            focus:outline-none
                            focus:ring-4
                            focus:ring-gray-200
                        "
                    >
                        Sign in
                    </button>
                </Link>
            )}
        </div>
    </div>
</div>
    )
}