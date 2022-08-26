import { useState, FormEvent} from 'react'
import { EmailField } from '../components/EmailField'
import { PasswordField } from '../components/PasswordField'
import { TextField } from '../components/TextField'
import { typeTextfield } from '../constraints/types'

const initTextfield : typeTextfield = {
  data: "",
  isValid: false,
  isDirty: false
} 

export function SignUp(){
  const [email, setEmail] = useState<typeTextfield>(initTextfield)
  const [password, setPassword] = useState<typeTextfield>(initTextfield)


  function emailConsistency(email: string) : boolean{
    return /\S+@\S+\.\S+/.test(email)
  }

  function passwordConsistency(password: string) : boolean{
    return !(password.includes(" ") || password.length < 8)
  }

  function loginHandler(event: FormEvent<HTMLButtonElement>){
    event.preventDefault();
    if(email.isValid && password.isValid){
      console.log("Login realizado");
    }
  }

  return (
    <div>
      <form>
        <TextField 
            type='text' 
            placeholder='Email'
            valueData={email}
            setValueData={setEmail}
            verifyFunction = {emailConsistency}
            errorMessage = "Email inválido"/>
        <TextField 
            type='password' 
            placeholder='Password'
            valueData={password}
            setValueData={setPassword}
            verifyFunction = {passwordConsistency}
            errorMessage = "Senha inválida"/>
        <button
          onClick={event => loginHandler(event)}
        >Acessar</button>
      </form>
    </div>
  )
}