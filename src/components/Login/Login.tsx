import { useState, FormEvent, useRef} from 'react'
import { emailConsistency, passwordConsistency } from '../../constraints/fieldsConsistency'
import { typeTextfieldRef } from '../../constraints/types'
import { useAxios } from '../../hooks/useAxios'
import { TextField } from '../TextField/TextField'
import "./Login.css"

export function Login(){
  const emailRef = useRef<typeTextfieldRef>(null)
  const passwordRef = useRef<typeTextfieldRef>(null)

  function loginHandler(event: FormEvent<HTMLButtonElement>){
    event.preventDefault();
    if (emailRef.current?.isValid && passwordRef.current?.isValid){

        useAxios.post('/login', {
          email: emailRef.current.value,
          password: passwordRef.current.value
        }).then(response => {
          console.log(response.data)
        }).catch(error => {
          console.log(error.response.data)
        })  
    } else {
      console.log("Login error.")
    }
  }
  
  return (
    <div>
      <form>
        <h1 className='title'>Login</h1>
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
          className='login-button'
          onClick={event => loginHandler(event)}
        >Login</button>
      </form>
    </div>
  )
}