import { InputHTMLAttributes, RefObject, useState } from "react";
import { typeTextfieldRef } from "../../constraints/types";
import eye from "../../assets/eyeIcon.svg";
import no_eye from "../../assets/no_eyeIcon.svg";
import clear from "../../assets/closeIcon.svg"
import "./TextField.css"

type textfieldProps = InputHTMLAttributes<HTMLInputElement> &{
    reference: RefObject<typeTextfieldRef>,
    verifyFunction?: (params : string) => boolean,
    errorMessage?: string
}

export function TextField({ reference,
                            verifyFunction = () => true,
                            errorMessage = "", 
                            ...props} : textfieldProps){

  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const [errorState, setErrorState] = useState<boolean>(false);
  const {type,...restOfProps} = props;

  function isPasswordShow(): string{
    return (passwordShow) ? "text": "password";
  }

  function verifyTextField( reset: boolean) : void{
    if (reference.current) {
      const verificatedValue = verifyFunction(reference.current.value);
      reference.current.isValid = verificatedValue;

      if (verificatedValue != !errorState) setErrorState(!errorState);

      if (reset) {
        reference.current.value = ""
        reference.current.isValid = false
        setErrorState(false);
      }
    }
  }

  return (
    <div className="textfield">
      <div className="textfield-input">
        <input 
          {...restOfProps}
          type={(props.type == 'password') ? isPasswordShow() : props.type}
          onChange={() => verifyTextField(false)}
          ref={reference}
        >
        </input>
        {
          (props.type == 'password') ?
            <img 
              src= {passwordShow ? no_eye : eye}
              alt= {passwordShow ? "unshow" : "show"}
              onClick={() => {setPasswordShow(!passwordShow)}}
            /> 
          :
            <img 
              src={clear} 
              alt="clear"
              onClick={() => {verifyTextField(true)}}
            /> 
        }
      </div>
      <span className="textfield-error">
      {(errorState) && errorMessage}
      </span> 
    </div>
  )
}