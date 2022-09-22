import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { Field, useField } from "formik";
import { ChangeEvent, useState } from "react";

type passwordInputProps = InputProps & {
  name: string;
};

export function PasswordInputFormik({
  name,
  ...propsWithType
}: passwordInputProps) {
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const { type, ...props } = propsWithType;
  const [field, meta, helpers] = useField(name);

  function touchOnChange(e: ChangeEvent<any>) {
    helpers.setTouched(true, true);
    field.onChange(e);
  }

  return (
    <FormControl
      isInvalid={!(meta.error == null) && meta.touched}
      height="45px"
    >
      <InputGroup size="md">
        <Field
          {...field}
          {...props}
          as={Input}
          name={name}
          pr="4.5rem"
          type={passwordShow ? "text" : "password"}
          onChange={touchOnChange}
        />
        <InputRightElement width="3rem">
          <Button
            h="1.75rem"
            size="sm"
            onClick={() => {
              setPasswordShow(!passwordShow);
            }}
          >
            {passwordShow ? <ViewOffIcon /> : <ViewIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
}
