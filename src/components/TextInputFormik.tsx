import { CloseIcon } from "@chakra-ui/icons";
import { Button,
         FormControl,
         FormErrorMessage,
         Input,
         InputGroup,
         InputProps,
         InputRightElement } from "@chakra-ui/react";
import { Field } from "formik";

type textInputProps = InputProps &{
    name: string,
    touched: boolean | undefined,
    error: string | undefined,
    setFieldValue: ( field: string,
                     value: string,
                     showValidate?: boolean | undefined ) => void
}

export function TextInputFormik({ name,
                                  error,
                                  touched,
                                  setFieldValue,
                                  ...props}: textInputProps) {

    return (
        <FormControl isInvalid={!!error && touched} height="45px">
            <InputGroup size='md'>
                <Field 
                    as={Input} 
                    {...props} 
                    name={name}
                    pr='4.5rem'
                />
                <InputRightElement width='3rem'>
                    <Button 
                        h='1.75rem'
                        size='sm'
                        onClick={() => {setFieldValue(name, "", true)}}
                    >
                        <CloseIcon />
                    </Button>
                </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    )
}