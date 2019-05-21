import * as React from 'react'
import * as ReactDOM from 'react-dom'

import createMediaListener from './createMediaListener'
import {CSSTransition} from "react-transition-group"
import './index.scss'
import {Earth, Galaxy, Trees} from "./screens"

interface WithMediaState {
    media: { [key: string]: boolean }
}

const withMedia = (Comp: React.ComponentType<WithMediaState>) => {
    const media = createMediaListener({
        big: '(min-width: 1000px)',
        tiny: '(max-width: 600px)'
    })


    return class WithMedia extends React.Component<{}, WithMediaState> {
        dispose?: () => void

        constructor() {
            super({})
            this.state = {
                media: media.getState()
            }
        }

        componentDidMount(): void {
            this.dispose = media.addListener(media => this.setState({media}))
        }

        componentWillUnmount(): void {
            if (this.dispose)
                this.dispose()
        }

        render() {
            return <Comp {...this.state} />
        }

    }

}

class App extends React.Component<WithMediaState> {
    constructor(props: WithMediaState) {
        super(props)
    }

    render() {
        const {media} = this.props
        const {Comp,key} = media.big ? {Comp:Galaxy,key:"galaxy"} : (media.tiny? {Comp:Trees,key:"trees"}:{Comp:Earth,key:"earth"})
        return (
            <CSSTransition timeout={500} classNames="fade">
                <Comp key={key} />
            </CSSTransition>
        )

    }
}

const AppWithMedia = withMedia(App)

ReactDOM.render(<AppWithMedia/>, document.getElementById("container"))