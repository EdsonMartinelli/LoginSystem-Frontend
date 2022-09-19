import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Flex, Heading, VStack, Text, Button} from "@chakra-ui/react";
import { Formik } from "formik"
import { useState } from "react";
import * as yup from 'yup';
import { CheckBoxFormikSimplified } from "../components/CheckBoxFormikSimplified";
import { PasswordInputFormikSimplified } from "../components/PasswordInputFormikSimplified";
import { TextInputFormikSimplified } from "../components/TextInputFormikSimplified";
import { useAxios } from "../hooks/useAxios";

type signUpProps = {
    username: string,
    email: string,
    password: string,
    terms: boolean
}

export function SignUpFormikSimplified(){

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

    function loginHandler({ username, email, password, terms}: signUpProps) {
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

    function verifyTouched(fields: {}) {
        return Object.values(fields).some(value => {return !!value})
    }

    return(
        <>
            <Formik 
                initialValues={{ email: '', password: '', username: '', terms: false}}
                onSubmit={(values) => {loginHandler(values)} }
                validationSchema = {validationSchema}
            >
                {({ handleSubmit, isValid, touched }) => (
                    <>
                        <Heading height="60px">Sign Up</Heading>
                        <form onSubmit={handleSubmit}>
                            <VStack id="form-stack" width="full" spacing={8}>
                                <TextInputFormikSimplified 
                                    name='username'
                                    placeholder="Username"
                                />
                                <TextInputFormikSimplified 
                                    name='email'
                                    placeholder="Email"
                                />
                                <PasswordInputFormikSimplified
                                    name='password'
                                    placeholder="Password"
                                />
                                <CheckBoxFormikSimplified
                                    name="terms"
                                >
                                    I agree with all Terms and Conditions
                                </CheckBoxFormikSimplified>
                                <Button 
                                    colorScheme='red'
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