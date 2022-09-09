import { CloseIcon } from "@chakra-ui/icons";
import { Button,
         FormControl,
         FormErrorMessage,
         Input,
         InputGroup,
         InputProps,
         InputRightElement } from "@chakra-ui/react";
import { Dispatch, RefObject, SetStateAction, useState } from "react";
import { typeTextfieldRef } from "../constraints/types/TextFieldRef";

type emailInputProps = InputProps & {
    reference: RefObject<typeTextfieldRef>,
    verifyFunction?: (params: any) => boolean,
    isValidState: boolean,
    setIsValidState: Dispatch<SetStateAction<boolean>>,
    erroMessage?: string
}

export function TextInput( {reference,
                            erroMessage = "",
                            verifyFunction = () => true,
                            isValidState,
                            setIsValidState,
                            ...props} : emailInputProps) {

    const [isDirtyText, setIsDirtyText] = useState<boolean>(false)
        
    function resetInput(){
        if (reference.current) {
            reference.current.value = "";
            setIsValidState(false)

            reference.current.isDirty = false;
            setIsDirtyText(false)
        }
    }

    function verifyEmailInput() {
        if (reference.current) {
            const isValidCheck = verifyFunction(reference.current.value);
            if (isValidState != isValidCheck){
                setIsValidState(isValidCheck)
            }

            if (!reference.current.isDirty){
                reference.current.isDirty = true;
                setIsDirtyText(true)
            }
        }
    }

    return (
        <FormControl isInvalid={!isValidState && isDirtyText} height="45px">
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