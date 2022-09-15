import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type authGuardProps = {
    children: ReactNode
}

export function AuthGuard({children}: authGuardProps){
    const { userValidate } = useAuth()
    const [ canAccess, setCanAccess] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
        (async function teste() {
            try {
                await userValidate()
                setCanAccess(true)
            }catch(error){
                navigate('/')
            }
        })()
    }, [])

    return (
        <div>
            {canAccess && children}
        </div>
    )
}