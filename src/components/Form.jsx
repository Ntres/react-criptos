import { useEffect, useState } from "react";
import styled from "@emotion/styled";

import useSelectCoins from "../hooks/useSelectCoins";
import { coins } from "../data/coins";
import Error from "./Error";

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;
    &:hover{
        cursor: pointer;
        background-color: #7A7DFE;
    }
`

const Form = ({setCoins}) => {

    const [ criptos, setCriptos ] = useState([])
    const [ error, setError ] = useState(false)

    const [ coin, SelectCoins ] = useSelectCoins('Elige tu moneda', coins)
    const [ cripto, SelectCripto ] = useSelectCoins('Elige tu criptomoneda', criptos)

    useEffect(() => {
      const callAPI = async () => {
        const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"

        const res = await fetch(url)
        const result = await res.json()

        const arrayCriptos = result.Data.map(cripto => {
            const obj = {
                id: cripto.CoinInfo.Name,
                name: cripto.CoinInfo.FullName
            }
            return obj
        })

        setCriptos(arrayCriptos)

      }
      callAPI()
    }, [])
    
    const handleSubmit = (e) => {
        e.preventDefault()

        if([coin, cripto].includes('')) {
            setError(true)
            return
        }

        setError(false)
        setCoins({coin, cripto})
    }


    return (
        <>
            { error && <Error>Todos los campos son obligatorios</Error> }
            <form onSubmit={handleSubmit}>
                <SelectCoins />
                <SelectCripto />

                <InputSubmit
                    type="submit"
                    value="Cotizar"
                    />
            </form>
        </>
     );
}
 
export default Form;