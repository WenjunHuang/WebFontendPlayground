import * as React from 'react'
import {ReactElement} from "react"


interface FadeInProps {
    children:ReactElement
}

interface FadeInState{
    mounted:boolean
}

export default class FadeIn extends React.Component<FadeInProps,FadeInState> {
    constructor(props:FadeInProps){
        super(props)
        this.state = {
            mounted: false
        }
    }

    componentDidMount(): void {
        setTimeout(()=>{
            this.setState({mounted:true})
        },0)
    }

    render():React.ReactNode {
        const {className} = this.props.children.props
        return React.cloneElement(this.props.children,{
            className: className + (this.state.mounted ?' fade-in':'')
        })
    }
}