import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Button,
         FormControl,
         FormErrorMessage,
         Input,
         InputGroup,
         InputProps,
         InputRightElement } from "@chakra-ui/react";
import { Field, useField } from "formik";
import { ChangeEvent, useState} from "react";

type passwordInputProps = InputProps & {
  name: string
}

export function PasswordInputFormikSimplified( {name, ...propsWithType} : passwordInputProps){
    const [passwordShow, setPasswordShow] = useState<boolean>(false)
    const {type, ...props} = propsWithType
    const [field, meta, helpers] = useField(name)
    
    field.onChange = (e: ChangeEvent<HTMLInputElement>) => {
        helpers.setValue(e.target.value)
        if (!meta.touched) helpers.setTouched(true) 
    }

    return (
      <FormControl isInvalid={!!meta.error && meta.touched} height="45px">
        <InputGroup size='md'>
          <Field 
            {...field}
            {...props}
            as={Input}
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
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      </FormControl>
    )
}