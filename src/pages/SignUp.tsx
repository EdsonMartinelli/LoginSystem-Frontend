import { FormEvent, useRef, useState} from 'react'
import { useAxios } from '../hooks/useAxios'
import { Button, Checkbox, Flex, Text, Heading, VStack} from '@chakra-ui/react'
import { PasswordInput } from '../components/PasswordInput'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { TextInput } from '../components/TextInput'
import { typeTextfieldRef } from '../constraints/types/TextFieldRef'
import { usernameConsistency } from '../constraints/verifiers/usernameConsistency'
import { emailConsistency } from '../constraints/verifiers/emailConsistency'
import { typeOrientationAuthAnimation } from '../constraints/types/AnimatedAuth'

export function SignUp({ orientation } : { orientation : typeOrientationAuthAnimation }){

  const usernameRef = useRef<typeTextfieldRef>(null)
  const emailRef = useRef<typeTextfieldRef>(null)
  const passwordRef = useRef<typeTextfieldRef>(null)

  const [isValidUsername, setIsValidUsername] = useState<boolean>(false)
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false)
  const [isValidPassword, setIsValidPassword] = useState<boolean>(false)
  const [isValidTerms, setIsValidTerms] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [formError, setFormError] = useState<string>("")

  function signupHandler(event: FormEvent<HTMLButtonElement>){
    event.preventDefault();
    setIsLoading(true)
    useAxios.post('/signup', {
        username:usernameRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value
      }).then(response => {
        console.log(response.data)
      }).catch(error => {
        setFormError(error?.message || error.response.data.error)
        console.log(error?.message || error.response.data.error)
      }).finally(()=>{
        setIsLoading(false)
      })
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
            isValidState={isValidUsername}
            setIsValidState={setIsValidUsername}
            erroMessage="Invalid username."
          />      
          <TextInput
            type='email' 
            placeholder='Email'
            reference={emailRef}
            verifyFunction={emailConsistency}
            isValidState={isValidEmail}
            setIsValidState={setIsValidEmail}
            erroMessage="Invalid email."
          />
          <PasswordInput
            type='password' 
            placeholder='Password'
            reference={passwordRef}
            isValidState={isValidPassword}
            setIsValidState={setIsValidPassword}
            erroMessage="Invalid password."
          />
          <Checkbox 
            size='sm'
            onChange={() => {setIsValidTerms(!isValidTerms)}}
          >
            I agree with all Terms and Conditions
          </Checkbox>
          <Button 
            colorScheme='red'
            width='full'
            rightIcon={<ArrowForwardIcon />}
            onClick={event=> signupHandler(event)}
            isDisabled={(isValidEmail &&
                         isValidPassword &&
                         isValidUsername &&
                         isValidTerms) ? false : true}
            isLoading = {isLoading}
          >
            Sign up
          </Button>
          <Flex width="full" height="20px" align="center" justify="center">
            <Text fontSize='sm' color='red.500'>
              {formError}
            </Text>
          </Flex>
        </VStack>
      </form>
    </div>
  
  )
}
