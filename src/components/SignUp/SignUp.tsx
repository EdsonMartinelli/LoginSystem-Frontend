import { useState, FormEvent} from 'react'
import { TextField } from '../TextField/TextField'
import { typeTextfield } from '../../constraints/types'
import { emailConsistency, passwordConsistency, usernameConsistency } from '../../constraints/fieldsConsistency'
import "./SignUp.css"

const initTextfield : typeTextfield = {
  data: "",
  isValid: false,
  isDirty: false
} 

export function SignUp(){
  const [email, setEmail] = useState<typeTextfield>(initTextfield)
  const [password, setPassword] = useState<typeTextfield>(initTextfield)
  const [username, setUsername] = useState<typeTextfield>(initTextfield)

  function loginHandler(event: FormEvent<HTMLButtonElement>){
    event.preventDefault();
    if(email.isValid && password.isValid && username.isValid){
      const opitions = {
        method: 'POST',
        body: new URLSearchParams({
          username: username.data,
          email: email.data,
          password: password.data
        })
      }
      fetch("http://localhost:3000/signup", opitions)
        .then(response => response.json())
        .then(data => console.log(data));
    }
  }

  return (
    <div>
      <h1 className="title">Sign up</h1>
      <form>
        <TextField 
            type='text' 
            placeholder='Username'
            valueData={username}
            setValueData={setUsername}
            verifyFunction = {usernameConsistency}
            errorMessage = "Invalid username."/>
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
          onClick={event => loginHandler(event)}
          className="signup-button"
        >Sign up</button>
      </form>
    </div>
  )
}