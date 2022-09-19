import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Flex, Heading, Link, VStack, Text, Button } from "@chakra-ui/react";
import { Formik } from "formik"
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { PasswordInputFormik } from "../components/PasswordInputFormik";
import { TextInputFormik } from "../components/TextInputFormik";
import { typeOrientationAuthAnimation } from "../constraints/types/AnimatedAuth";
import { useAuth } from "../hooks/useAuth";

export function Login({ orientation } : { orientation : typeOrientationAuthAnimation }){

    const {userLogin} = useAuth()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [formError, setFormError] = useState<string>("")

    const validationSchema = yup.object().shape({
        email: yup.
                   string().
                   email("Email is invalid!").
                   required("Email is required!").
                   strict(true),

        password: yup.
                    string().
                    min(8, "Password is too short!").
                    max(16, "Password is too long!").
                    matches(/^(\S+$)/g, "Password is invalid!").
                    required("Password is required!").
                    strict(true)
    })

    function loginHandler({email, password}: {email: string, password: string}) {
        setIsLoading(true)
        if( email && password ){
            const loginInfo = { 
              email,
              password
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

    function verifyTouched(fields: {}) {
        return Object.values(fields).some(value => {return !!value})
    }

    return(
        <>
            <Formik 
            initialValues={{ email: '', password: ''}}
            onSubmit={(values) => {loginHandler(values)} }
            validationSchema = {validationSchema}
            >
                {({ handleSubmit, isValid, touched }) => (
                    <>
                        <Heading height="60px">Login</Heading>
                        <form onSubmit={handleSubmit}>
                            <VStack id="form-stack" width="full" spacing={8}>
                                <TextInputFormik 
                                    name='email'
                                />
                                <Flex width="full" flexDirection="column">
                                    <PasswordInputFormik
                                        name='password'
                                    />
                                    <Flex 
                                        width="full" 
                                        height="22px"
                                        align="flex-end"
                                        justify="end"
                                    >
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
                                </Flex>
                                <Button 
                                    colorScheme='blue'
                                    width='full'
                                    rightIcon={<ArrowForwardIcon />}
                                    type="submit"
                                    isDisabled={ isValid && 
                                                 verifyTouched(touched) ? false : true}
                                    isLoading = {isLoading}
                                >
                                    Login
                                </Button>
                                <Flex 
                                    width="full"
                                    height="20px"
                                    align="center"
                                    justify="center"
                                >
                                    <Text fontSize='sm' color='red.500'>
                                        {formError}
                                    </Text>
                                </Flex>
                            </VStack>
                        </form>
                    </>
                )}
            </Formik>
        </>
    )
}