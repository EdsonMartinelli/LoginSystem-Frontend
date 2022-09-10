import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

export function useAuth() {
    const auth = useContext(AuthContext)
    return auth
}
