import { Dispatch, SetStateAction, useEffect } from "react"

interface Props{
    XB: number,
    setXB: Dispatch<SetStateAction<number>>
}

export function UseEffectTest({ XB, setXB } :Props) {
    console.log("render")
    let x = 1
    console.log("render 2")
    useEffect(() => {
        console.log(x)
    }, [x])

    function mudaValor() {
        setXB(XB + 1)
        x = x + 1
    }
    return (
        <>
            <h1>{x}</h1>
            <button onClick={mudaValor}>Vai</button>
        </>
    )
}