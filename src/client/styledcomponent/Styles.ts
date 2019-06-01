import {css, DefaultTheme, FlattenSimpleInterpolation, ThemedCssFunction} from "styled-components"

export const setColor = {
    primaryColor: '#af9a7d',
    mainWhite: '#fff',
    mainBlack: '#222',
    mainGrey: '#ececec',
    lightGrey: '#f7f7f7',
}
// font-family: 'Lato', sans-serif;
export const setFont = {
    main: `font-family: 'Lato', sans-serif;`,
    slanted: `font-family: 'Courgette', cursive;`
}

export const setFlex = ({x, y}: { x: string, y: string } = {x: "center", y: "center"}) => {
    return css`
     display:flex;
     align-items:${y};
     justify-content:${x};
    `
}

export const setBackground = ({img, color = 'rgba(0,0,0,0.5)'}: { img?: string, color?: string }) => {
    return css`
    background:linear-gradient(${color},${color}), url(${img}) center/cover no-repeat;
    `
}

export const setRem = (num: number = 16) => {
    return `${num / 16}rem`
}

export const setLetterSpacing = (num: number = 2) => {
    return `letter-spacing:${num}px`
}

export const setBorder = ({width = "2px", style = "solid", color = "black"}: { width?: string, style?: string, color?: string }) => {
    return css`border:${width} ${style} ${color};`
}

const sizes = {
    large: 1200,
    desktop: 992,
    tablet: 768,
    phone: 576,
}

type SizeType = typeof sizes

export const media  = <{ [P in keyof SizeType]: ThemedCssFunction<DefaultTheme> }>Object.keys(sizes).reduce((acc, key) => {
    acc[key] = (first, ...args) => css`
@media (min-width: ${sizes[key] / 16}em) {
  ${css(first, ...args)}
}`
    return acc
}, {} as { [P in keyof SizeType]?: ThemedCssFunction<DefaultTheme> })

export const setTransition = ({property = "all", time = "0.3s", timing = "ease-in-out"}: { property?: string, time?: string, timing?: string }) => {
    return css`
      transition:${property} ${time} ${timing};
    `
}

export const setShadow = {
   light: "box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.75)",
   dark: "box-shadow: 6px 6px 5px 0px rgba(0,0,0,0.75)",
   darkest:"box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75)"
}