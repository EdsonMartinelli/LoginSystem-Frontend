import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Flex, Heading, VStack, Text, Button} from "@chakra-ui/react";
import { Formik } from "formik"
import { useState } from "react";
import * as yup from 'yup';
import { CheckBoxFormik } from "../components/CheckBoxFormik";
import { PasswordInputFormik } from "../components/PasswordInputFormik";
import { TextInputFormik } from "../components/TextInputFormik";
import { typeOrientationAuthAnimation } from "../constraints/types/AnimatedAuth";
import { useAxios } from "../hooks/useAxios";

type signUpProps = {
    username: string,
    email: string,
    password: string,
    terms: boolean
}

export function SignUp({ orientation } : { orientation : typeOrientationAuthAnimation }){

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [formError, setFormError] = useState<string>("")

    const validationSchema = yup.object().shape({
        username: yup.
                   string().
                   min(3, "Username is too short!").
                   max(20, "Username is too long!").
                   required("Username is required!").
                   strict(true),
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
                    strict(true),

        terms: yup.boolean().oneOf([true]),
    })

    function signUpHandler({ username, email, password, terms}: signUpProps) {
        setIsLoading(true)
        if( username && email && password && terms ){
            useAxios.post('/signup', {
                username,
                email,
                password
            }).then(response => {
                console.log(response.data)
            }).catch(error => {
                setFormError(error?.message || error.response.data.error)
                console.log(error?.message || error.response.data.error)
            }).finally(()=>{
                setIsLoading(false)
            })
        }
    }

    return(
        <>
            <Formik 
                initialValues={{ email: '', password: '', username: '', terms: false }}
                onSubmit={(values) => {signUpHandler(values)} }
                validationSchema = {validationSchema}
                initialErrors = {{ email: '', password: '', username: '', terms: ""}}
            >
                {({ handleSubmit, isValid, dirty}) => (
                    <>
                        <Heading height="60px">Sign Up</Heading>
                        <form onSubmit={handleSubmit}>
                            <VStack id="form-stack" width="full" spacing={8}>
                                <TextInputFormik
                                    name='username'
                                    placeholder="Username"
                                />
                                <TextInputFormik
                                    name='email'
                                    placeholder="Email"
                                />
                                <PasswordInputFormik
                                    name='password'
                                    placeholder="Password"
                                />
                                <CheckBoxFormik
                                    name="terms"
                                >
                                    I agree with all Terms and Conditions
                                </CheckBoxFormik>
                                <Button 
                                    colorScheme='red'
                                    width='full'
                                    rightIcon={<ArrowForwardIcon />}
                                    type="submit"
                                    isDisabled={ isValid && dirty ? false : true}
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