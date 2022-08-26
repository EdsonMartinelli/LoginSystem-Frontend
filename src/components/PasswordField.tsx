import { typeTextfield } from "../constraints/types";

type passwordProps = {
    password: typeTextfield
    setPassword: (params : typeTextfield) => void
}

export function PasswordField({password, setPassword} : passwordProps){

  function passwordConsistency(password: string) : boolean{
    return !(password.includes(" ") || password.length < 8)
  }

  function verifyPassword(password: string) : void{
    setPassword({ data: password,
                  isValid: passwordConsistency(password),
                  isDirty: true });
  }

  return (
    <div>
        <input 
          type="password"  
          placeholder='Password'
          onChange={event => verifyPassword(event.target.value)}
        >
        </input>
        { (!password.isValid && password.isDirty) ? <span>Senha inválida</span> : null}
    </div>
  )
}