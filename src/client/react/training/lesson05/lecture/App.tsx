import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './style.scss'

interface ScrollYProps {
    render: (y: number) => React.ReactNode
}

interface ScrollYState {
    y: number
}

class ScrollY extends React.Component<ScrollYProps, ScrollYState> {
    constructor(props: ScrollYProps) {
        super(props)
        this.state = {
            y: 0
        }
    }

    handleWindowScroll = () => {
        this.setState({
            y: window.scrollY
        })
    }

    componentDidMount(): void {
        this.handleWindowScroll()
        window.addEventListener('scroll', this.handleWindowScroll)
    }

    componentWillUnmount(): void {
        window.removeEventListener('scroll', this.handleWindowScroll)
    }

    render(): React.ReactNode {
        return this.props.render(this.state.y)
    }

}

const getHeaderStyle = (y: number) => {
    const pin = y >= 300
    const top = -y/2
    return {
        top: pin ? '0px' : `${top + 150}px`,
        textShadow: pin ? `0px ${(y - 300) / 5}px ${Math.min((y - 300) / 10, 50)}px rgba(0,0,0,0.5)` : 'none'
    }
}

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <ScrollY render={(y) => (
                    <h1 style={getHeaderStyle(y)}>
                        Scroll down!
                    </h1>
                )}/>
            </div>
        )
    }

}

ReactDOM.render(<App/>, document.getElementById('container'))