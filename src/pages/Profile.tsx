import { useContext } from "react"
import { AuthContext } from "../providers/AuthProvider"

export function Profile() {

    const {user} = useContext(AuthContext)
    return (
        <div>
            <h1>{user?.id}</h1>
            <h1>{user?.username}</h1>
            <h1>{user?.email}</h1>
        </div>
    )
}