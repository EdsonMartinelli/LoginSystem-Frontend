import { useState, FormEvent} from 'react'

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

  function emailConsistency(email: string) : boolean{
    return /\S+@\S+\.\S+/.test(email)
  }

  function passwordConsistency(password: string) : boolean{
    return !(password.includes(" ") || password.length < 8)
  }

  function verifyEmail(email: string) : void{
    setEmail({ data: email,
               isValid: emailConsistency(email),
               isDirty: true });
  }

  function verifyPassword(password: string) : void{
    setPassword({ data: password,
                  isValid: passwordConsistency(password),
                  isDirty: true });
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
        <input 
          type='email' 
          placeholder='Email'
          onChange={event => verifyEmail(event.target.value)}
        >
        </input>
        { (!email.isValid && email.isDirty) ? <span>Email inválido</span> : null}
        <input 
          type="password"  
          placeholder='Password'
          onChange={event => verifyPassword(event.target.value)}
        >
        </input>
        { (!password.isValid && password.isDirty) ? <span>Senha inválida</span> : null}
        <button
          onClick={event => loginHandler(event)}
        >Acessar</button>
      </form>
    </div>
  )
}