import * as React from 'react';
import styled from 'styled-components'
import {setFont, setLetterSpacing, setRem} from "../../Styles"

type Props = {
    title?:string,
    center?:boolean
};

const Title = (props: React.HTMLProps<HTMLBaseElement>&Props) => {
    return (
        <h3 className={props.className}>
            {props.title}
        </h3>
    );
};

export default styled(Title)`
  font-size: ${setRem(36)};
  text-transform: capitalize;
  ${setLetterSpacing(5)};
  
  ${setFont.slanted};
  text-align: ${props => props.center ? "center":"left"};
`