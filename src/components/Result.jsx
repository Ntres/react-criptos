import styled from "@emotion/styled";

const ResultDiv = styled.div`
    color: #FFF;
    font-family: 'Lato', sans-serif;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 30px;
`
const Text = styled.p`
    font-size: 18px;
    span {
        font-weight: 700;
    }
`

const Price= styled.p`
    font-size:24px;
    span {
        font-weight: 700;
    }
`

const Image = styled.img`
    display: block;
    width: 120px;
`

const Result = ({result}) => {
    const {PRICE, LOWDAY, HIGHDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} = result
    return ( 
        <ResultDiv>
            <Image src={`https://cryptocompare.com/${IMAGEURL}`} alt="img cripto" />
            <div>
                <Price>El precio es: <span>{PRICE}</span></Price>
                <Text>Precio mas alto del día: <span>{HIGHDAY}</span></Text>
                <Text>precio mas bajo del día: <span>{LOWDAY}</span></Text>
                <Text>Variación en últimas 24h: <span>{CHANGEPCT24HOUR}</span></Text>
                <Text>Ultima actualización: <span>{LASTUPDATE}</span></Text>
            </div>
        </ResultDiv>
     );
}
 
export default Result;