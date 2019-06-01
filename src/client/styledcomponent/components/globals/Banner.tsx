// @flow
import * as React from 'react';
import styled, {css, keyframes} from 'styled-components'
import {media, setBorder, setColor, setLetterSpacing, setRem} from "../../Styles"

type Props = {
    title: string,
    text: string,
    greeting: string
};

const fadeIn = (start:string, point:string, end:string) => {
    const animation = keyframes`
      0% {
        opacity: 0;
        transform: translateY(${start})
      }
      
      50% {
        opacity: 0.5;
        transform: translateY(${point})
      }
      100% {
        opacity: 1;
        transform: translateY(${end})
      }
    `

    return css`animation: ${animation} 3s ease-in-out`
}


const Banner: React.FC<Props & React.HTMLProps<HTMLDivElement>> = (props) => {
    return (
        <div className={props.className}>
            <h1>{props.greeting} <span>{props.title}</span></h1>
            <div className="info">
                <p>{props.text}</p>
            </div>
            {props.children}
        </div>
    );
};

const BannerWrapper = styled(Banner)`
  background: rgba(0,0,0,0.7);
  text-align: center;
  padding: ${setRem(60)} ${setRem(32)};
  ${setLetterSpacing(3)};
  color: ${setColor.mainWhite};
  h1 {
    text-transform: capitalize;
    font-size: ${setRem(48)};
    color: ${setColor.primaryColor};
    span {
      color: ${setColor.mainWhite};
    }
  }
  p {
    width: 85%;
    margin: 0 auto;
  }
  ${media.tablet!`
    width: 70vw;
    ${setBorder({width: "6px", color: setColor.primaryColor})};
    p {
        width: 75%;
    }
  `}
  
  h1 {
    ${fadeIn('100%','-10%','0%')};
  }
   
   .info {
    ${fadeIn('-100%','10%','0%')};
   }
`

export default BannerWrapper
