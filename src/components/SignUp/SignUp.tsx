import { FormEvent, useRef} from 'react'
import { TextField } from '../TextField/TextField'
import { emailConsistency, passwordConsistency, usernameConsistency } from '../../constraints/fieldsConsistency'
import { typeTextfieldRef } from '../../constraints/types'
import "./SignUp.css"

export function SignUp(){

  const usernameRef = useRef<typeTextfieldRef>(null)
  const emailRef = useRef<typeTextfieldRef>(null)
  const passwordRef = useRef<typeTextfieldRef>(null)

  function loginHandler(event: FormEvent<HTMLButtonElement>){
    event.preventDefault();
    
    if (usernameRef.current?.isValid && emailRef.current?.isValid &&
        passwordRef.current?.isValid){

        const opitions = {
          method: 'POST',
          body: new URLSearchParams({
            username:usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
          })
        }
        fetch("http://localhost:3000/signup", opitions)
          .then(response => response.json())
          .then(data => console.log(data))

    } else {
      console.log(usernameRef.current);
    }
  }

  return (
    <div>
      <h1 className="title">Sign up</h1>
      <form>
        <TextField 
            type='text' 
            placeholder='Username'
            reference={usernameRef}
            verifyFunction = {usernameConsistency}
            errorMessage = "Invalid username."/>
        <TextField
            type='text' 
            placeholder='Email'
            reference={emailRef}
            verifyFunction = {emailConsistency}
            errorMessage = "Invalid email."/>
        <TextField
            type='password' 
            placeholder='Password'
            reference={passwordRef}
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
