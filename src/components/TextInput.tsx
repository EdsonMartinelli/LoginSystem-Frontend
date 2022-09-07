import { CloseIcon } from "@chakra-ui/icons";
import { Button,
         FormControl,
         FormErrorMessage,
         Input,
         InputGroup,
         InputProps,
         InputRightElement } from "@chakra-ui/react";
import { RefObject, useState } from "react";
import { typeTextfieldRef } from "../constraints/types/TextFieldRef";

type emailInputProps = InputProps & {
    reference: RefObject<typeTextfieldRef>,
    verifyFunction?: (params: any) => boolean,
    erroMessage?: string
}

export function TextInput( {reference,
                             erroMessage = "",
                             verifyFunction = () => true,
                             ...props} : emailInputProps) {

    const [isValidText, setIsValidText] = useState<boolean>(false)
    const [isDirtyText, setIsDirtyText] = useState<boolean>(false)
        
    function resetInput(){
        if (reference.current) {
            reference.current.value = "";
            reference.current.isValid = false;
            setIsValidText(false)

            reference.current.isDirty = false;
            setIsDirtyText(false)
        }
    }

    function verifyEmailInput() {
        if (reference.current) {
            const isValidCheck = verifyFunction(reference.current.value);
            if (reference.current.isValid != isValidCheck){
                reference.current.isValid = isValidCheck;
                setIsValidText(isValidCheck)
            }

            if (!reference.current.isDirty){
                reference.current.isDirty = true;
                setIsDirtyText(true)
            }
        }
    }

    return (
        <FormControl isInvalid={!isValidText && isDirtyText} height="45px">
            <InputGroup size='md'>
                <Input
                {...props}
                pr='4.5rem'
                onChange={() => verifyEmailInput()}
                ref={reference}
                />
                <InputRightElement width='3rem'>
                    <Button 
                    h='1.75rem'
                    size='sm'
                    onClick={() => resetInput()}
                    >
                        <CloseIcon />
                    </Button>
                </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{erroMessage}</FormErrorMessage>
        </FormControl>
    )
}