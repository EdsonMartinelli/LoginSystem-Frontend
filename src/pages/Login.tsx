import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Button,
         Checkbox,
         Heading,
         VStack,
         Text,
         Flex,
         Spacer,
         Link } from '@chakra-ui/react'
import { FormEvent, useContext, useRef, useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { PasswordInput } from '../components/PasswordInput'
import { TextInput } from '../components/TextInput'
import { typeOrientationAuthAnimation } from '../constraints/types/AnimatedAuth'
import { typeTextfieldRef } from '../constraints/types/TextFieldRef'
import { emailConsistency } from '../constraints/verifiers/emailConsistency'
import { useAxios } from '../hooks/useAxios'
import { AuthContext } from '../providers/AuthProvider'

export function Login({ orientation } : { orientation : typeOrientationAuthAnimation }){
  const emailRef = useRef<typeTextfieldRef>(null)
  const passwordRef = useRef<typeTextfieldRef>(null)

  const [isValidPassword, setIsValidPassword] = useState<boolean>(false)
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {getUser} = useContext(AuthContext)
  const navigate = useNavigate()

  function loginHandler(event: FormEvent<HTMLButtonElement>){
    event.preventDefault();   
    if(emailRef.current && passwordRef.current){
      const loginInfo = { 
        email: emailRef.current?.value,
        password: passwordRef.current?.value
      }
      getUser(loginInfo)
        .then(() => {
          navigate("/profile")
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
    /*useAxios.post('/login', {
        email: emailRef.current?.value,
        password: passwordRef.current?.value
      }).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error.response.data)
      })*/
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
          <PasswordInput
            type='password' 
            placeholder='Password'
            reference={passwordRef}
            isValidState={isValidPassword}
            setIsValidState={setIsValidPassword}
            erroMessage="Invalid password."
          />
          <Flex width="full" align="center" justify="center">
            <Checkbox 
              size='sm'
            >
              Remember me
            </Checkbox>
            <Spacer />
            <Text fontSize='xs'>
              <Link 
                as={NavLink} 
                to={{pathname:'/recover'}} 
                state={{orientation}} 
              >
                Forgot your password?
              </Link>
            </Text>
          </Flex>
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
        </VStack>
      </form>
    </div>
  
  )
}