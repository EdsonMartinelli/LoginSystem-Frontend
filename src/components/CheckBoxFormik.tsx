import { Checkbox, InputProps} from "@chakra-ui/react";
import { Field, useField } from "formik";
import { ReactNode} from "react";

type checkBoxProps = InputProps & {
  name: string,
  children: ReactNode
}

export function CheckBoxFormik( {name, children, ...propsWithType} : checkBoxProps){
    const {type, ...props} = propsWithType
    const [field] = useField(name)

    return (
        <Field
            {...field}
            {...props}
            as={Checkbox}
            size='sm'
            name={name}
        >
            {children}
        </Field>
    )
}