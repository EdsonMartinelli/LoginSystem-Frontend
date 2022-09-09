import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Button,
         FormControl,
         FormErrorMessage, 
         Input,
         InputGroup,
         InputProps,
         InputRightElement } from "@chakra-ui/react";
import { Dispatch, RefObject, SetStateAction, useState } from "react";
import { typeTextfieldRef } from "../constraints/types/TextFieldRef";
import { passwordConsistency } from "../constraints/verifiers/passwordConsistency";

type passwordInputProps = InputProps &{
    reference: RefObject<typeTextfieldRef>,
    isValidState: boolean,
    setIsValidState: Dispatch<SetStateAction<boolean>>,
    erroMessage?: string
}

export function PasswordInput( {reference,
                                isValidState,
                                setIsValidState,
                                erroMessage,
                                ...props} : passwordInputProps) {

    const [passwordShow, setPasswordShow] = useState<boolean>(false)
    const [isDirtyPassword, setIsDirtyPassword] = useState<boolean>(false)
    const {type,...restOfProps} = props

    function verifyPasswordInput() {
        if (reference.current) {
            const isValid = passwordConsistency(reference.current.value);
            if (isValidState != isValid){
                setIsValidState(isValid)
            }

            if (!reference.current.isDirty){
                reference.current.isDirty = true;
                setIsDirtyPassword(true)
            }
        }
    }

    return (
        <FormControl isInvalid={!isValidState && isDirtyPassword} height="45px">
            <InputGroup size='md'>
                <Input
                {...restOfProps}
                pr='4.5rem'
                type={passwordShow ? 'text' : 'password'}
                onChange={() => verifyPasswordInput()}
                ref={reference}
                />
                <InputRightElement width='3rem'>
                    <Button 
                    h='1.75rem'
                    size='sm'
                    onClick={() => {setPasswordShow(!passwordShow)}}
                    >
                        {passwordShow ? <ViewOffIcon/> : <ViewIcon/>} 
                    </Button>
                </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{erroMessage}</FormErrorMessage>
        </FormControl>
    )
}