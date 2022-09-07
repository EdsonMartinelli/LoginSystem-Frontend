import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Button, Heading, VStack } from '@chakra-ui/react'
import { FormEvent, useRef} from 'react'
import { PasswordInput } from '../components/PasswordInput'
import { TextInput } from '../components/TextInput'
import { typeTextfieldRef } from '../constraints/types/TextFieldRef'
import { emailConsistency } from '../constraints/verifiers/emailConsistency'
import { useAxios } from '../hooks/useAxios'

export function Login(){
  const emailRef = useRef<typeTextfieldRef>(null)
  const passwordRef = useRef<typeTextfieldRef>(null)

  function loginHandler(event: FormEvent<HTMLButtonElement>){
    event.preventDefault();
    if (emailRef.current?.isValid && passwordRef.current?.isValid){
        useAxios.post('/login', {
          email: emailRef.current?.value,
          password: passwordRef.current?.value
        }).then(response => {
          console.log(response.data)
        }).catch(error => {
          console.log(error.response.data)
        })
    } else {
      console.log("Login error.")
    }
  }

  return(
    <div>
      <Heading height="60px">Login</Heading>
      <form>
        <VStack id="form-stack" width="full" spacing={8}>          
          <TextInput
            type='email' 
            placeholder='Email'
            reference={emailRef}
            erroMessage="email password"
            verifyFunction={emailConsistency}
          />
          <PasswordInput
            type='password' 
            placeholder='Password'
            reference={passwordRef}
            erroMessage="error password"
          />
          <Button 
            colorScheme='blue'
            width='full'
            rightIcon={<ArrowForwardIcon />}
            onClick={(event)=> loginHandler(event)}
          >
            Login
          </Button>
        </VStack>
      </form>
    </div>
  
  )
}