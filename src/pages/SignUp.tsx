import { FormEvent, useRef} from 'react'
import { useAxios } from '../hooks/useAxios'
import { Button, Heading, VStack } from '@chakra-ui/react'
import { PasswordInput } from '../components/PasswordInput'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { TextInput } from '../components/TextInput'
import { typeTextfieldRef } from '../constraints/types/TextFieldRef'
import { usernameConsistency } from '../constraints/verifiers/usernameConsistency'
import { emailConsistency } from '../constraints/verifiers/emailConsistency'

export function SignUp(){

  const usernameRef = useRef<typeTextfieldRef>(null)
  const emailRef = useRef<typeTextfieldRef>(null)
  const passwordRef = useRef<typeTextfieldRef>(null)

  function signupHandler(event: FormEvent<HTMLButtonElement>){
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

  return(
    <div>
      <Heading height="60px">Sign up</Heading>
      <form>
        <VStack id="form-stack" width="full" spacing={8}>    
          <TextInput
            type='text' 
            placeholder='Username'
            reference={usernameRef}
            verifyFunction={usernameConsistency}
            erroMessage="Invalid username."
          />      
          <TextInput
            type='email' 
            placeholder='Email'
            reference={emailRef}
            verifyFunction={emailConsistency}
            erroMessage="Invalid email."
          />
          <PasswordInput
            type='password' 
            placeholder='Password'
            reference={passwordRef}
            erroMessage="Invalid password."
          />
          <Button 
            colorScheme='red'
            width='full'
            rightIcon={<ArrowForwardIcon />}
            onClick={event=> signupHandler(event)}
          >
            Sign up
          </Button>
        </VStack>
      </form>
    </div>
  
  )
}
