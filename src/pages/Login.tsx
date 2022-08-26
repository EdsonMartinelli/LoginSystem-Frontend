import { useState, FormEvent} from 'react'
import { EmailField } from '../components/EmailField'
import { PasswordField } from '../components/PasswordField'

type textfield ={
  data: string,
  isValid: boolean,
  isDirty: boolean
}

const initTextfield : textfield = {
  data: "",
  isValid: false,
  isDirty: false
} 

export function Login(){
  const [email, setEmail] = useState<textfield>(initTextfield)
  const [password, setPassword] = useState<textfield>(initTextfield)

  function loginHandler(event: FormEvent<HTMLButtonElement>){
    event.preventDefault();
    if(email.isValid && password.isValid){
      console.log("Login realizado");
    }
  }

  return (
    <div>
      <form>
        <EmailField email={email} setEmail={setEmail} />
        <PasswordField password={password} setPassword={setPassword} />
        <button
          onClick={event => loginHandler(event)}
        >Acessar</button>
      </form>
    </div>
  )
}