import { Checkbox, CheckboxProps } from "@chakra-ui/react";
import { Field, useField } from "formik";
import { ReactNode } from "react";

type checkBoxProps = CheckboxProps & {
  name: string;
  children: ReactNode;
};

export function CheckBoxFormik({ name, children, ...props }: checkBoxProps) {
  const [field] = useField(name);

  return (
    <Field {...field} {...props} as={Checkbox} size="sm" name={name}>
      {children}
    </Field>
  );
}
