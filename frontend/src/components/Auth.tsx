import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router"
import axios from 'axios';
import { BACKEND_URL } from "../config";

export const Auth=({ type }:{type:"signup"|"signin"})=>{
    const navigate= useNavigate();
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    async function sendRequest(){
        try{
            const response= await axios.post(`${BACKEND_URL}/v1/api/users/${type==="signup"?"signup":"signin"}`,{
                ...(type === "signup" && { name:name }),
                email:email,
                password:password
            });
            const jwt= response.data.jwt;
            console.log(jwt);
            localStorage.setItem("token",jwt);
            navigate("/blogs")
        }catch(e){
            alert(`Error while ${type==="signup"?"signup":"signin"}`)
        }
    }

    return(<div className="h-screen flex justify-center flex-col ">
        <div className="flex justify-center">
            <div>
            <div className="text-xl font-semibold mt-4">
                Create an Account
            </div>
            <div className="text-slate-400">
                {type==="signup"?"Already have and account?":"Don't have an account?"}
                <Link className="pl-2 underline"to={type==="signup"?"/signin":"/signup"}>{type==="signup"?"sign in":"sign up"}</Link>
            </div>
            {type==='signup'?
            <LabledInput label="Name" placeholder="John" onChange={(e)=>{
                setName(e.target.value)
            }}/>:null}
            
            <LabledInput label="Email" placeholder="John@gmail.com" onChange={(e)=>{
                setEmail(e.target.value)
            }}/>
            <LabledInput label="password" placeholder="*********" onChange={(e)=>{
                setPassword(e.target.value)
            }}type="password"/>

            <button onClick={sendRequest}type="button" className="w-full bg-black
            text-white
            border border-gray-
            hover:bg-gray-800
            rounded-md
            py-2
            mt-4
            outline-none
            focus:outline-none
            appearance-none">{type==="signup"?"Sign up":"Sign in"}</button>

            </div>
        </div>
    </div>)
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