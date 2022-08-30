import { useState, FormEvent} from 'react'
import { emailConsistency, passwordConsistency } from '../../constraints/fieldsConsistency'
import { TextField } from '../TextField/TextField'
import "./Login.css"

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
      const opitions = {
        method: 'POST',
        body: new URLSearchParams({
          email: email.data,
          password: password.data
        })
      }
      fetch("http://localhost:3000/login", opitions)
        .then(response => response.json())
        .then(data => console.log(data));
    }
  }
  
  return (
    <div>
      <form>
      <h1 className='title'>Login</h1>
      <TextField 
            type='text' 
            placeholder='Email'
            valueData={email}
            setValueData={setEmail}
            verifyFunction = {emailConsistency}
            errorMessage = "Invalid email."/>
        <TextField 
            type='password' 
            placeholder='Password'
            valueData={password}
            setValueData={setPassword}
            verifyFunction = {passwordConsistency}
            errorMessage = "Invalid password."/>
        <button
          className='login-button'
          onClick={event => loginHandler(event)}
        >Login</button>
      </form>
    </div>
  )
}