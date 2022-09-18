import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Button,
         FormControl,
         FormErrorMessage, 
         Input,
         InputGroup,
         InputProps,
         InputRightElement } from "@chakra-ui/react";
import { Field } from "formik";
import { useState } from "react";

type textInputProps = InputProps &{
    name: string,
    touched: boolean | undefined,
    error: string | undefined,
}

export function PasswordInputFormik({ name,
                                      error,
                                      touched,
                                      ...propsWithType }: textInputProps) {

    const [passwordShow, setPasswordShow] = useState<boolean>(false)
    const {type, ...props} = propsWithType

    return (
        <FormControl isInvalid={!!error && touched} height="45px">
            <InputGroup size='md'>
                <Field 
                    as={Input}
                    {...props}
                    name={name}
                    pr='4.5rem'
                    type={passwordShow ? 'text' : 'password'}
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
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    )
}