import styled from 'styled-components'
import {setBackground, setFlex} from "../../Styles"

interface HeroProps {
    img: string
    color?:string
}

const Hero = styled.header<HeroProps>`
    min-height: 100vh;
    ${props => setBackground({img:props.img,color:"rgba(0,0,0,0.5)"})};
    ${setFlex()};
`

export default Hero
