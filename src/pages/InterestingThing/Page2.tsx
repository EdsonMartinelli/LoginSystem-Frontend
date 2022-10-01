import { useState } from "react";
import { UseEffectTest } from "./UseEffectTest";

export function Page2() {
    const [XB, setXB] = useState(1)
    return (
      <>
        <h1>Page Teste</h1>
        <UseEffectTest XB={XB} setXB={setXB}/>
      </>
    );
}