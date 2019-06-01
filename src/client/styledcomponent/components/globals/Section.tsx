import styled from 'styled-components'
import {setRem} from "../../Styles"

type SectionProps = {
    color?:string
}
const Section = styled.section<SectionProps>`
  padding: ${setRem(64)} 0;
  background: ${props => props.color};
`

export default Section
