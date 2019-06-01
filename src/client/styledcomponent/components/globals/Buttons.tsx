// @flow
import * as React from 'react'
import styled, {css} from 'styled-components'
import {
    setColor, setRem, setLetterSpacing, setFont, setBorder, setTransition
} from "../../Styles"

type PrimaryBtnProps = {
    t?:string,
    r?:string,
    b?:string,
    l?:string
}

export const PrimaryBtn = styled.button<PrimaryBtnProps>`
  display: inline-block; 
  background: ${setColor.primaryColor};
  color: ${setColor.mainWhite};
  text-transform: capitalize;
  font-size: ${setRem(18)};
  ${setFont.main};
  padding:${setRem(17)} ${setRem(36)};
  ${setBorder({color:setColor.primaryColor})}
  ${setLetterSpacing(3)};
  ${setTransition({time:'2s'})};
  
  &:hover {
    background: transparent;
    color:${setColor.primaryColor};
  }
  
  ${props=>`margin: ${props.t || 0} ${props.r || 0} ${props.b||0} ${props.l || 0}`};
  text-decoration: none;
  cursor: pointer;
`
export const SmallBtn = styled(PrimaryBtn)`
  padding: ${setRem(9)} ${setRem(12)}; 
`