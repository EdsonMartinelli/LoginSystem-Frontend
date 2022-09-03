import { Login } from "../../components/Login";
import { SignUp } from "../../components/SignUp";
import "./Autentication.css"

export function Autentication(){
    return (
        <div className="content">
          <main className="login-content">
            <Login />
          </main>
          <aside className="signup-content">
            <SignUp />
          </aside>
        </div>
    )
}