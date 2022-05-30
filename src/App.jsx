import styled from '@emotion/styled'
import ImageCripto from './img/imagen-criptos.png'
import Form from './components/Form'
import { useEffect, useState } from 'react'
import Result from './components/Result'
import Spinner from './components/Spinner'

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    colum-gap: 2rem;
  }
`

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`

function App() {

  const [coins, setCoins] = useState({})
  const [result, setResult] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(Object.keys(coins).length > 0) {
      const callAPI = async () => {
        setResult({})
        setLoading(true)
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coins.cripto}&tsyms=${coins.coin}`

        const res = await fetch(url)
        const result = await res.json()

        setResult(result.DISPLAY[coins.cripto][coins.coin])
        setLoading(false)
      }
      callAPI()
    }
  }, [coins])
  

  return (
    <Contenedor>
      <Imagen src={ImageCripto} alt="Imagenes criptomonedas"></Imagen>
      <div>
        <Heading>Cotiza criptomonedas al instante</Heading>

        <Form setCoins={setCoins} />

        {loading && <Spinner />}
        
        {Object.keys(result).length > 0 && <Result result={result} />}
      </div>
    </Contenedor>
  )
}

export default App
