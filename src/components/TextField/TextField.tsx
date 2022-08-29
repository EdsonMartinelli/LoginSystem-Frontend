import { InputHTMLAttributes } from "react";
import { typeTextfield } from "../../constraints/types";
import "./TextField.css"

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
    <div className="textfield">
        <input 
          {...props}
          className="textfield-input"
          onChange={event => verifyTextField(event.target.value)}
        >
        </input>
         <span className="textfield-error">
          {(!valueData.isValid && valueData.isDirty) && errorMessage}
         </span> 
    </div>
  )
}
