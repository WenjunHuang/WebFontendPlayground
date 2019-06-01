import * as React from 'react';
import Section from "../globals/Section"
import Title from "../globals/Title"
import aboutImg from '../../images/aboutBcg.jpeg'
import styled from 'styled-components'
import {PrimaryBtn} from "../globals/Buttons"
import {media, setBorder, setColor, setLetterSpacing, setRem} from "../../Styles"


type Props = {
};

export const About = (props: Props) => {
    return (
        <Section>
            <AboutCenter>
                <div className="about-img">
                    <img src={aboutImg} alt="about us"/>
                </div>
                <div className="about-info">
                    <Title title="about us"></Title>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vulputate suscipit ipsum, tincidunt interdum urna euismod ut. Duis vulputate at nulla sit amet cursus. Aenean commodo sed tortor vel gravida. Donec euismod neque sed purus rhoncus posuere. Nam blandit iaculis blandit.
                    </p>
                    <PrimaryBtn>read more</PrimaryBtn>
                </div>

            </AboutCenter>
        </Section>
    );
};

const AboutCenter = styled.div`
  .about-img,
  .about-info {
    padding: ${setRem(30)};
  }
  
  .about-img {
    img {
      width: 100%;
      display: block;
      ${setBorder({width:setRem(6),color:setColor.primaryColor})};
    }
  }
  
  .about-info {
    p {
      ${setLetterSpacing(3)};
    }
  }
  width: 90vw;
  margin: 0 auto;
 ${media.desktop`
     width: 100vw; 
     max-width: 1170px;
     display:grid;
     grid-template-columns:1fr 1fr;
     grid-column-gap: ${setRem(32)};
     
     .about-img,
     .about-info {
       padding: ${setRem(0)};
     }
  
     .about-img,
     .about-info {
        align-self:center;
     }
     
     .about-info {
         p {
            width: 80%; 
         } 
     }
     
 `} 
  
`
