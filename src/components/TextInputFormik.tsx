import { CloseIcon } from "@chakra-ui/icons";
import { Button,
         FormControl,
         FormErrorMessage,
         Input,
         InputGroup,
         InputProps,
         InputRightElement } from "@chakra-ui/react";
import { Field, useField } from "formik";
import { ChangeEvent} from "react";

type textInputProps = InputProps & {
  name: string
}

export function TextInputFormik( {name, type, ...props} : textInputProps){
    const [field, meta, helpers] = useField(name)
    
    field.onChange = (e: ChangeEvent<HTMLInputElement>) => {
        helpers.setValue(e.target.value)
        if (!meta.touched) helpers.setTouched(true) 
    }

    return (
      <FormControl isInvalid={!!meta.error && meta.touched} height="45px">
        <InputGroup size='md'>
          <Field
            as={Input}
            {...field}
            {...props} 
            type={(type) ? type : "text"}
            name={name}
            pr='4.5rem'
          />
          <InputRightElement width='3rem'>
            <Button 
              h='1.75rem'
              size='sm'
              onClick={() => {helpers.setValue("")}}
            >
              <CloseIcon />
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      </FormControl>
    )
}