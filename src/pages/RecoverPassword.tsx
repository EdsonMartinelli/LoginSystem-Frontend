import { Button, Flex, Text, Heading, VStack } from "@chakra-ui/react"
import * as yup from 'yup'
import { useState } from "react"
import { typeOrientationAuthAnimation } from "../constraints/types/AnimatedAuth"
import { Formik } from "formik"
import { TextInputFormik } from "../components/TextInputFormik"

export function RecoverPassword({ orientation } : { orientation : typeOrientationAuthAnimation }) {
    
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [formError, setFormError] = useState<string>("")

    const validationSchema = yup.object().shape({
        email: yup.
                   string().
                   email("Email is invalid!").
                   required("Email is required!").
                   strict(true),
    })

    function recoverPasswordHandler({email} : {email: string}){
        setIsLoading(true)
        setTimeout(() => {
            console.log(email)
            setIsLoading(false)
            setFormError("Fail")
        }, 3000)
    }

    function verifyTouched(fields: {}) {
        return Object.values(fields).some(value => {return !!value})
    }

    return (
        <>
            <Formik 
                initialValues={{ email: ''}}
                onSubmit={(values) => {recoverPasswordHandler(values)} }
                validationSchema = {validationSchema}
            >
                {({ handleSubmit, isValid, touched }) => (
                    <>
                        <Heading height="40px">Forgot </Heading>
                        <Heading height="90px">Your Password?</Heading>
                        <form onSubmit={handleSubmit}>
                            <VStack width="full" spacing={8}>
                                <TextInputFormik 
                                    name='email'
                                    placeholder='Email'
                                />
                                <Button 
                                    colorScheme='blue'
                                    width='full'
                                    type="submit"
                                    isDisabled={ isValid && 
                                                 verifyTouched(touched) ? false : true}
                                    isLoading = {isLoading}
                                >
                                    Recover
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