import { InputHTMLAttributes, useState } from "react";
import { typeTextfield } from "../../constraints/types";
import show from "../../assets/react.svg"
import clear from "../../assets/vite.svg"
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

  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const {type, ...propsWithoutType} = props

  function isPasswordShow(): string{
    return (passwordShow) ? "text": "password"
  }

  function verifyTextField(stringValue: string, reset: boolean) : void{
    setValueData({ data: stringValue,
                   isValid: verifyFunction(stringValue),
                   isDirty: !reset });
  }

  return (
    <div className="textfield">
      <div className="textfield-input">
        <input 
          {...propsWithoutType}
          value = {valueData.data}
          type={(props.type == 'password') ? isPasswordShow() : props.type}
          onChange={event => verifyTextField(event.target.value, false)}
        >
        </input>
        {
          (props.type == 'password') ?
            <img 
              src={show} 
              alt="show"
              onClick={() => {setPasswordShow(!passwordShow)}}
            /> 
          :
            <img 
            src={clear} 
            alt="clear"
            onClick={() => {verifyTextField("", true)}}
            /> 
        }
      </div>
      <span className="textfield-error">
      {(!valueData.isValid && valueData.isDirty) && errorMessage}
      </span> 
    </div>
  )
}