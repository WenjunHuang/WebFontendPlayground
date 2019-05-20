import "./index.scss"
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import FadeIn from "./FadeIn"
import {Message, subscribeToMessages} from "./messages"

class PinScrollToBottom extends React.Component {
    scrolledUp:boolean = false

    scroll() {
        if (!this.scrolledUp)
            window.scrollTo(0,document.documentElement.scrollHeight)
    }

    componentDidMount(): void {
        this.scroll()
    }

    componentDidUpdate(): void {
        this.scroll()
    }

    componentWillUpdate() {
        const {clientHeight,scrollTop,scrollHeight} = document.documentElement
        this.scrolledUp = clientHeight + scrollTop < scrollHeight
    }

    render(){
        return this.props.children
    }
}

interface AppState {
    messages:Message[]
}
class App extends React.Component<{},AppState> {
    constructor(){
        super({})
        this.state = {messages:[]}
    }
    componentDidMount(): void {
        subscribeToMessages((message)=> {
            this.setState({
                messages: this.state.messages.concat([message])
            })
        })
    }

    render():React.ReactNode {
        const {messages} = this.state
        return (
            <div className="app">
                <div className="link">
                    <a target="_blank"
                       rel="noopener noreferrer">Sketch on YouTube</a>
                </div>
                <PinScrollToBottom>
                    <ol className="messages">
                        {messages.map((message,index)=>(
                            <FadeIn key={index}>
                                <li className="message">
                                    <div className="avatar"
                                         style={{
                                             backgroundImage:`url(/${message.avatar})`
                                         }}/>
                                    <div className="text">{message.text}</div>
                                </li>
                            </FadeIn>
                        ))}
                    </ol>
                </PinScrollToBottom>
            </div>
        )
    }
}

ReactDOM.render(<App />,document.getElementById("container"))