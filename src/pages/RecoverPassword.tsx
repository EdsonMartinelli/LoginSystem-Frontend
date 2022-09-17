import { Button, Flex, Text, Heading, VStack } from "@chakra-ui/react"
import { FormEvent, useRef, useState } from "react"
import { TextInput } from "../components/TextInput"
import { typeOrientationAuthAnimation } from "../constraints/types/AnimatedAuth"
import { typeTextfieldRef } from "../constraints/types/TextFieldRef"
import { emailConsistency } from "../constraints/verifiers/emailConsistency"

export function RecoverPassword({ orientation } : { orientation : typeOrientationAuthAnimation }) {
    
    const emailRef = useRef<typeTextfieldRef>(null)
    const [isValidEmail, setIsValidEmail] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [formError, setFormError] = useState<string>("")

    function recoverPasswordHandler(event : FormEvent){
        event.preventDefault()
        setIsLoading(true)
        setInterval(() => {
            setIsLoading(false)
            setFormError("falha")
        }, 3000)
    }

    return (
        <div>
            <Flex width="full" height="80px" align="flex-start" justify="center">
                <Heading size='lg'>Recover Password</Heading>
            </Flex>
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
                    <Button 
                        colorScheme='blue'
                        width='full'
                        onClick={(event)=> recoverPasswordHandler(event)}
                        isDisabled={(isValidEmail) ? false : true}
                        isLoading = {isLoading}
                    >
                        Recover
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