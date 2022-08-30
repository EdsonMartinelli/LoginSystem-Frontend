import { Login } from "../../components/Login/Login";
import { SignUp } from "../../components/SignUp/SignUp";

export function Autentication(){
    return (
        <div>
          <SignUp />
          <Login />
        </div>
    )
}