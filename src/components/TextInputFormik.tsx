import { CloseIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { Field, useField } from "formik";
import { ChangeEvent } from "react";
import { InputButton } from "./InputButton";

type textInputProps = InputProps & {
  name: string;
};

export function TextInputFormik({ name, type, ...props }: textInputProps) {
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
          as={Input}
          {...field}
          {...props}
          type={type ?? "text"}
          name={name}
          pr="4.5rem"
          onChange={touchOnChange}
          paddingRight="3.5rem"
        />
        <InputRightElement width="3rem">
          <InputButton click={() => helpers.setValue("")}>
            <CloseIcon />
          </InputButton>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
}
