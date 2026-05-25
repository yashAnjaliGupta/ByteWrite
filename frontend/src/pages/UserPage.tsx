import { useState,useEffect } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { AvatarText } from "../components/BlogCard"
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router";

export function UserPage() {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate=useNavigate();
    const auth= useAuth();
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/v1/api/users/me`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            .then(response => {
                setName(response.data.username)
                setDescription(response.data.description)
            })
    },[])

    async function handleSaveProfile() {

        try {
            axios.put(`${BACKEND_URL}/v1/api/users/me`,{
                name,
                description
            } ,{
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
        } catch (error) {
            console.error(error)
        }
    }

    async function handlePasswordUpdate() {

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match")
            return
        }

        try {
            axios.put(`${BACKEND_URL}/v1/api/users/me/password`,{
                currentPassword,
                newPassword
            } ,{
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            localStorage.removeItem("token");
            auth?.logout()
            navigate("/signin");
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="min-h-screen bg-[#f9fafb] px-4 py-10 sm:px-6 lg:px-8">
            
            <div className="mx-auto max-w-5xl">

                {/* Header */}
                <div className="mb-10">

                    <h1 className="text-4xl font-bold text-gray-900">
                        Account Settings
                    </h1>

                    <p className="mt-3 text-gray-500">
                        Manage your public profile and account security.
                    </p>

                </div>

                <div className="grid gap-8 lg:grid-cols-3">

                    {/* Sidebar */}
                    <div className="lg:col-span-1">

                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center gap-4">

                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-xl font-bold text-white">
                                    {AvatarText(name)}
                                </div>

                                <div>

                                    <div className="font-semibold text-gray-900">
                                        {name}
                                    </div>

                                    <div className="text-sm text-gray-500">
                                        {description}
                                    </div>

                                </div>

                            </div>

                            <div className="mt-6 border-t border-gray-100 pt-6">

                                <div className="space-y-4 text-sm">

                                    <div className="rounded-xl bg-gray-100 px-4 py-3 font-medium text-gray-900">
                                        Profile Settings
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Main Content */}
                    <div className="space-y-8 lg:col-span-2">

                        {/* Profile Section */}
                        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

                            <div className="mb-6">

                                <h2 className="text-2xl font-bold text-gray-900">
                                    Public Profile
                                </h2>

                                <p className="mt-2 text-sm text-gray-500">
                                    This information will be displayed publicly.
                                </p>

                            </div>

                            <div className="space-y-6">

                                {/* Name */}
                                <div>

                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your name"
                                        className="
                                            w-full
                                            rounded-2xl
                                            border
                                            border-gray-200
                                            bg-white
                                            px-4
                                            py-3
                                            text-gray-900
                                            outline-none
                                            transition
                                            focus:border-black
                                        "
                                    />

                                </div>

                                {/* Description */}
                                <div>

                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Bio / Description
                                    </label>

                                    <textarea
                                        rows={5}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Tell readers about yourself..."
                                        className="
                                            w-full
                                            resize-none
                                            rounded-2xl
                                            border
                                            border-gray-200
                                            bg-white
                                            px-4
                                            py-3
                                            text-gray-900
                                            outline-none
                                            transition
                                            focus:border-black
                                        "
                                    />

                                </div>

                                <button
                                    onClick={handleSaveProfile}
                                    className="
                                        rounded-full
                                        bg-black
                                        px-6
                                        py-3
                                        text-sm
                                        font-medium
                                        text-white
                                        transition
                                        hover:bg-gray-800
                                    "
                                >
                                    Save Profile
                                </button>

                            </div>

                        </div>

                        {/* Password Section */}
                        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

                            <div className="mb-6">

                                <h2 className="text-2xl font-bold text-gray-900">
                                    Password & Security
                                </h2>

                                <p className="mt-2 text-sm text-gray-500">
                                    Update your password regularly for better security.
                                </p>

                            </div>

                            <div className="space-y-6">

                                {/* Current Password */}
                                <div>

                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Current Password
                                    </label>

                                    <input
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        placeholder="Current password"
                                        className="
                                            w-full
                                            rounded-2xl
                                            border
                                            border-gray-200
                                            bg-white
                                            px-4
                                            py-3
                                            text-gray-900
                                            outline-none
                                            transition
                                            focus:border-black
                                        "
                                    />

                                </div>

                                {/* New Password */}
                                <div>

                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        New Password
                                    </label>

                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="New password"
                                        className="
                                            w-full
                                            rounded-2xl
                                            border
                                            border-gray-200
                                            bg-white
                                            px-4
                                            py-3
                                            text-gray-900
                                            outline-none
                                            transition
                                            focus:border-black
                                        "
                                    />

                                </div>

                                {/* Confirm Password */}
                                <div>

                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Confirm Password
                                    </label>

                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm password"
                                        className="
                                            w-full
                                            rounded-2xl
                                            border
                                            border-gray-200
                                            bg-white
                                            px-4
                                            py-3
                                            text-gray-900
                                            outline-none
                                            transition
                                            focus:border-black
                                        "
                                    />

                                </div>

                                <button
                                    onClick={handlePasswordUpdate}
                                    className="
                                        rounded-full
                                        bg-green-600
                                        px-6
                                        py-3
                                        text-sm
                                        font-medium
                                        text-white
                                        transition
                                        hover:bg-green-700
                                    "
                                >
                                    Update Password
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}