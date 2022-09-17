import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Button,
         Heading,
         VStack,
         Text,
         Flex,
         Link } from '@chakra-ui/react'
import { FormEvent, useRef, useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { PasswordInput } from '../components/PasswordInput'
import { TextInput } from '../components/TextInput'
import { typeOrientationAuthAnimation } from '../constraints/types/AnimatedAuth'
import { typeTextfieldRef } from '../constraints/types/TextFieldRef'
import { emailConsistency } from '../constraints/verifiers/emailConsistency'
import { useAuth } from '../hooks/useAuth'

export function Login({ orientation } : { orientation : typeOrientationAuthAnimation }){
  
  const emailRef = useRef<typeTextfieldRef>(null)
  const passwordRef = useRef<typeTextfieldRef>(null)

  const [isValidPassword, setIsValidPassword] = useState<boolean>(false)
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [formError, setFormError] = useState<string>("")

  const {userLogin} = useAuth()
  const navigate = useNavigate()

  function loginHandler(event: FormEvent<HTMLButtonElement>){
    event.preventDefault();   
    setIsLoading(true)
    if( emailRef.current && passwordRef.current ){
      const loginInfo = { 
        email: emailRef.current?.value,
        password: passwordRef.current?.value
      }
      userLogin(loginInfo)
        .then(() => {
          navigate("/profile")
        })
        .catch((error: any) => {
          setFormError(error?.message)
        })
        .finally(() => {
          setIsLoading(false)
        })
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
            isValidState={isValidEmail}
            setIsValidState={setIsValidEmail}
            erroMessage="Invalid email."
            verifyFunction={emailConsistency}
          />
          <div>
            <PasswordInput
              type='password' 
              placeholder='Password'
              reference={passwordRef}
              isValidState={isValidPassword}
              setIsValidState={setIsValidPassword}
              erroMessage="Invalid password."
            />
            <Flex width="full" height="22px" align="flex-end" justify="end">
              <Text fontSize='xs' zIndex="2">
                <Link 
                  as={NavLink} 
                  to={{pathname:'/recover'}} 
                  state={{orientation}} 
                >
                  Forgot your password?
                </Link>
              </Text>
            </Flex>
          </div>
          <Button 
            colorScheme='blue'
            width='full'
            rightIcon={<ArrowForwardIcon />}
            onClick={(event)=> loginHandler(event)}
            isDisabled={(isValidPassword && isValidEmail) ? false : true}
            isLoading = {isLoading}
          >
            Login
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