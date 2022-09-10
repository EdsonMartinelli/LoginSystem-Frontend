import { createContext, ReactNode, useEffect, useState } from "react";
import { useAxios } from "../hooks/useAxios";
import jwt_decode from "jwt-decode";

type User = {
    id: string,
    username: string,
    email: string
}

type loginProps = {
    email: string,
    password: string
}

type authContextProps = {
    user?: User,
    getUser: (login : loginProps ) => Promise<void>,
    deleteUser: () => void
}

export const AuthContext = createContext<authContextProps>({} as authContextProps)

export function AuthProvider({children}: {children : ReactNode}){

    const [user, setUser] = useState<User| undefined>(undefined)

    useEffect(() => {
        const token = localStorage.getItem("token_login_system")
        if (token) {
            const decoded = jwt_decode(token) as User
            setUser({
                id: decoded.id,
                username: decoded.username,
                email: decoded.email
            })
        }
    },[])

    async function getUser({email, password} : loginProps ) {
        const response = await useAxios.post('/login', { email, password })
        if (response.status >= 400) {
            throw new Error("Email or password invalid.")
        }
        localStorage.setItem("token_login_system", response.data.token)
        const decoded = jwt_decode(response.data.token) as User
        setUser({
            id: decoded.id,
            username: decoded.username,
            email: decoded.email
        })
    }

    function deleteUser(){
        localStorage.removeItem("token_login_system")
        setUser(undefined)
    }

    return (
        <AuthContext.Provider value={{user, getUser, deleteUser}}>
            {children}
        </AuthContext.Provider>
    )

}

