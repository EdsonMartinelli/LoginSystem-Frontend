import { FormEvent, useRef} from 'react'
import { TextField } from '../TextField/TextField'
import { useAxios } from '../../hooks/useAxios'
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

        useAxios.post('/signup', {
          username:usernameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value
        }).then(response => {
          console.log(response.data)
        }).catch(error => {
          console.log(error.response.data)
        })

    } else {
      console.log("Sign up error.");
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
