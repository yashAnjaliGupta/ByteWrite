import axios from 'axios';
import { createContext, useContext, useEffect, useState,type ReactNode } from "react";
import { BACKEND_URL } from './config';

type AuthContextType = {
    isAuthenticated: boolean;
    loading: boolean;
    username: string;
    login: (u: string) => void;
};

type AuthProviderProps = {
    children: ReactNode;
};

// contextAPI does not make app performative but make syntax clear and prevent prop drilling
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated]= useState(false);
    const [loading,setLoading ]= useState(true);
    const [username,setUsername]=useState("")
    useEffect(()=>{
        const verify=async()=>{
            const token= localStorage.getItem('token');
            if(!token){
                setLoading(false);
                return;
            };
            try{
                const res= await axios.get(`${BACKEND_URL}/v1/api/users/me`,{
                    headers:{
                        Authorization: 'Bearer '+token,
                    }
                })
                if(res.status===200){
                    setUsername(res.data.username);
                    setIsAuthenticated(true);
                }else{
                    localStorage.removeItem("token");
                }
            }catch(err){
                localStorage.removeItem("token");
            }
            setLoading(false);
        };
        verify();
    },[]);
    const login=(u: string)=>{
        setIsAuthenticated(true);
        setUsername(u);
    };
    return (
        <AuthContext.Provider value={{isAuthenticated,loading, username ,login}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth=()=>useContext(AuthContext);