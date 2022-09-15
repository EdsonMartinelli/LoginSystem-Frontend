import { useContext } from "react";
import { AuthContext, authContextProps } from "../providers/AuthProvider";

export function useAuth() {
    const auth: authContextProps  = useContext(AuthContext)
    return auth
}
