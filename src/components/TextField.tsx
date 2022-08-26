import { InputHTMLAttributes } from "react";
import { typeTextfield } from "../constraints/types";

type textfieldProps = InputHTMLAttributes<HTMLInputElement> &{
    valueData: typeTextfield,
    setValueData: (params : typeTextfield) => void,
    verifyFunction?: (params : string) => boolean,
    errorMessage?: string
}

export function TextField({ valueData,
                            setValueData,
                            verifyFunction = () => true,
                            errorMessage = "", 
                            ...props} : textfieldProps){

  function verifyTextField(stringValue: string) : void{
    setValueData({ data: stringValue,
                   isValid: verifyFunction(stringValue),
                   isDirty: true });
  }

  return (
    <div>
        <input 
          {...props}
          onChange={event => verifyTextField(event.target.value)}
        >
        </input>
        { (!valueData.isValid && valueData.isDirty) ? <span>{errorMessage}</span> : null}
    </div>
  )
}
