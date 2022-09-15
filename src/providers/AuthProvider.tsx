import { createContext, ReactNode, useState } from "react";
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

export type authContextProps = {
    user?: User,
    userLogin: (login : loginProps ) => Promise<void>,
    userLogout: () => void,
    userValidate: () => Promise<void>
}

export const AuthContext = createContext<authContextProps>({} as authContextProps)

export function AuthProvider({children}: {children: ReactNode}){

    const [user, setUser] = useState<User| undefined>(undefined)

    async function userLogin({email, password} : loginProps ) {
        const response = await useAxios.post('/login', { email, password })

        if (response.status >= 400) throw new Error()

        localStorage.setItem("token_login_system", response.data.token)
        const decoded = jwt_decode(response.data.token) as User
        setUser({
            id: decoded.id,
            username: decoded.username,
            email: decoded.email
        })
    }

    function userLogout(){
        localStorage.removeItem("token_login_system")
        setUser(undefined)
    }

    async function userValidate(){
        const token = localStorage.getItem("token_login_system")

        if(!token) {
            userLogout()
            throw new Error()
        }

        const response = await useAxios.get('/revalidateToken')

        if (response.status >= 400) {
            userLogout()
            throw new Error()
        }
            
        localStorage.setItem("token_login_system", response.data.token)
        const decoded = jwt_decode(response.data.token) as User
        setUser({
            id: decoded.id,
            username: decoded.username,
            email: decoded.email
        })
    
    }

    return (
        <AuthContext.Provider value={{user, userLogin, userLogout, userValidate}}>
            {children}
        </AuthContext.Provider>
    )

}

