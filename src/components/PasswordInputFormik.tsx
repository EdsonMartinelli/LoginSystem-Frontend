import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { Field, useField } from "formik";
import { ChangeEvent, useState } from "react";
import { InputButton } from "./InputButton";

type passwordInputProps = InputProps & {
  name: string;
  nameLabel: string;
};

export function PasswordInputFormik({
  nameLabel,
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
    <FormControl isInvalid={!(meta.error == null) && meta.touched}>
      <FormLabel>{nameLabel}</FormLabel>
      <InputGroup size="md">
        <Field
          {...field}
          {...props}
          as={Input}
          name={name}
          pr="4.5rem"
          type={passwordShow ? "text" : "password"}
          onChange={touchOnChange}
          paddingRight="3.5rem"
        />
        <InputRightElement width="3rem">
          <InputButton
            click={() => {
              setPasswordShow(!passwordShow);
            }}
          >
            {passwordShow ? <ViewOffIcon /> : <ViewIcon />}
          </InputButton>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage position="fixed">{meta.error}</FormErrorMessage>
    </FormControl>
  );
}
