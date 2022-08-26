import { typeTextfield } from "../constraints/types";

type emailProps = {
    email: typeTextfield
    setEmail: (params : typeTextfield) => void
}

export function EmailField({email, setEmail} : emailProps){

  function emailConsistency(email: string) : boolean{
    return /\S+@\S+\.\S+/.test(email)
  }

  function verifyEmail(email: string) : void{
    setEmail({ data: email,
               isValid: emailConsistency(email),
               isDirty: true });
  }

  return (
    <div>
        <input 
            type='email' 
            placeholder='Email'
            onChange={event => verifyEmail(event.target.value)}
        >
        </input>
        { (!email.isValid && email.isDirty) ? <span>Email inválido</span> : null}
    </div>
  )
}