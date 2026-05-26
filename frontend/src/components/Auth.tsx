import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router"
import axios from 'axios';
import { BACKEND_URL } from "../config";
import { useAuth } from "../AuthContext";

export const Auth = ({
    type,
}: {
    type: "signup" | "signin"
}) => {

    const navigate = useNavigate()

    const auth = useAuth()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [otp, setOtp] = useState("")

    const [otpSent, setOtpSent] = useState(false)

    const [loading, setLoading] = useState(false)

    async function sendOtp() {

        try {

            setLoading(true)

            await axios.post(
                `${BACKEND_URL}/v1/api/users/sendotp`,
                {
                    email
                }
            )

            setOtpSent(true)

        } catch (e) {

            console.log(e)

            alert("Failed to send OTP")

        } finally {

            setLoading(false)
        }
    }

    async function sendRequest() {

        try {

            setLoading(true)

            const response = await axios.post(
                `${BACKEND_URL}/v1/api/users/${
                    type === "signup"
                        ? "signup"
                        : "signin"
                }`,
                {
                    ...(type === "signup" && {
                        name,
                    }),

                    email,

                    password,

                    ...(type === "signup" && {
                        otp,
                    })
                }
            )

            const jwt = response.data.jwt

            localStorage.setItem(
                "token",
                jwt
            )

            auth?.login(email)

            navigate("/blogs")

        } catch (e) {

            console.log(e)

            alert(
                `Error while ${
                    type === "signup"
                        ? "signup"
                        : "signin"
                }`
            )

        } finally {

            setLoading(false)
        }
    }

    return (

        <div
            className="
                min-h-screen
                bg-[#f9fafb]
                px-4
                py-10
                flex
                items-center
                justify-center
            "
        >

            <div
                className="
                    w-full
                    max-w-md
                    rounded-3xl
                    border
                    border-gray-200
                    bg-white
                    p-8
                    shadow-xl
                "
            >

                {/* Heading */}
                <div className="mb-8 text-center">

                    <h1
                        className="
                            text-3xl
                            font-bold
                            text-gray-900
                        "
                    >
                        {
                            type === "signup"
                                ? "Create Account"
                                : "Welcome Back"
                        }
                    </h1>

                    <p
                        className="
                            mt-3
                            text-sm
                            text-gray-500
                        "
                    >
                        {
                            type === "signup"
                                ? "Already have an account?"
                                : "Don't have an account?"
                        }

                        <Link
                            className="
                                ml-2
                                font-medium
                                text-black
                                underline
                            "
                            to={
                                type === "signup"
                                    ? "/signin"
                                    : "/signup"
                            }
                        >
                            {
                                type === "signup"
                                    ? "Sign in"
                                    : "Sign up"
                            }
                        </Link>

                    </p>

                </div>

                {/* Inputs */}
                <div className="space-y-5">

                    {
                        type === "signup" && (

                            <LabledInput
                                label="Name"
                                placeholder="John Doe"
                                onChange={(e) => {
                                    setName(
                                        e.target.value
                                    )
                                }}
                            />
                        )
                    }

                    <LabledInput
                        label="Email"
                        placeholder="john@gmail.com"
                        onChange={(e) => {
                            setEmail(
                                e.target.value
                            )
                        }}
                    />

                    <LabledInput
                        label="Password"
                        placeholder="********"
                        type="password"
                        onChange={(e) => {
                            setPassword(
                                e.target.value
                            )
                        }}
                    />

                    {/* OTP Input */}
                    {
                        otpSent && (
                            <LabledInput
                                label="OTP"
                                placeholder="Enter 6 digit OTP"
                                onChange={(e) => {
                                    setOtp(
                                        e.target.value
                                    )
                                }}
                            />
                        )
                    }

                </div>

                {/* Button */}
                <button

                    onClick={
                        type === "signup"
                            ? (
                                otpSent
                                    ? sendRequest
                                    : sendOtp
                            )
                            : sendRequest
                    }

                    disabled={loading}

                    type="button"

                    className="
                        mt-6
                        w-full
                        rounded-2xl
                        bg-black
                        px-4
                        py-3
                        text-sm
                        font-medium
                        text-white
                        transition-all
                        duration-200
                        hover:bg-gray-800
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                    "
                >

                    {
                        loading
                            ? "Please wait..."
                            : (
                                type === "signup"
                                    ? (
                                        otpSent
                                            ? "Sign up"
                                            : "Verify Email"
                                    )
                                    : "Sign in"
                            )
                    }

                </button>

            </div>

        </div>
    )
}

interface LabledInputType{
    label:string;
    placeholder:string;
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void
    type?:string
}
function LabledInput({label,placeholder,onChange,type}:LabledInputType){
    return (
        <div>
            <label className="block mb-2.5 text-sm font-medium text-heading pt-2">{label}</label>
            <input onChange={onChange} type={type||"text"} id={label} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder={placeholder} />
        </div>
    )
}