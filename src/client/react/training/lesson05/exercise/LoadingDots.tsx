import * as React from 'react'

interface LoadingDotsProps {
    interval: number
    dots: number
}

interface LoadingDotsState {
    frame: number
}
export default class LoadingDots extends React.Component<LoadingDotsProps,LoadingDotsState> {
    interval?: number
    constructor(props:LoadingDotsProps) {
        super(props)
        this.state = {
            frame: 1
        }
    }

    componentDidMount(): void {
        this.interval = window.setInterval(()=>{
            this.setState({
                frame: this.state.frame + 1
            })
        },this.props.interval)
    }

    componentWillUnmount(): void {
        window.clearInterval(this.interval)
    }

    render() {
        let dots = this.state.frame % (this.props.dots + 1)
        let text = ''
        while (dots > 0) {
            text += '.'
            dots--
        }

        return <span className="loading-dots">{text}&nbsp;</span>
    }


}