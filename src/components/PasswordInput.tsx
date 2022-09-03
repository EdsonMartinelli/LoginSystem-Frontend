import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Button,
         FormControl,
         FormErrorMessage, 
         Input,
         InputGroup,
         InputProps,
         InputRightElement } from "@chakra-ui/react";
import { RefObject, useState } from "react";
import { passwordConsistency } from "../constraints/fieldsConsistency";
import { typeTextfieldRef } from "../constraints/types";

type passwordInputProps = InputProps &{
    reference: RefObject<typeTextfieldRef>,
    erroMessage?: string
}

export function PasswordInput( {reference,
                                erroMessage,
                                ...props} : passwordInputProps) {

    const [passwordShow, setPasswordShow] = useState<boolean>(false)
    const [isValidPassword, setIsValidPassword] = useState<boolean>(false)
    const [isDirtyPassword, setIsDirtyPassword] = useState<boolean>(false)
    const {type,...restOfProps} = props

    function verifyPasswordInput() {
        if (reference.current) {
            const isValid = passwordConsistency(reference.current.value);
            if (reference.current.isValid != isValid){
                reference.current.isValid = isValid
                setIsValidPassword(isValid)
            }

            if (!reference.current.isDirty){
                reference.current.isDirty = true;
                setIsDirtyPassword(true)
            }
        }
    }

    return (
        <FormControl isInvalid={!isValidPassword && isDirtyPassword} height="45px">
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
            {
                (!isValidPassword) ? (
                    <FormErrorMessage>{erroMessage}</FormErrorMessage>
                ) : (
                    null
                )
            }
        </FormControl>
    )
}