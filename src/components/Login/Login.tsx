import { useState, FormEvent, useRef} from 'react'
import { emailConsistency, passwordConsistency } from '../../constraints/fieldsConsistency'
import { typeTextfieldRef } from '../../constraints/types'
import { TextField } from '../TextField/TextField'
import "./Login.css"

export function Login(){
  const emailRef = useRef<typeTextfieldRef>(null)
  const passwordRef = useRef<typeTextfieldRef>(null)

  function loginHandler(event: FormEvent<HTMLButtonElement>){
    event.preventDefault();
    if (emailRef.current?.isValid && passwordRef.current?.isValid){

      const opitions = {
        method: 'POST',
        body: new URLSearchParams({
          email: emailRef.current.value,
          password: passwordRef.current.value
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