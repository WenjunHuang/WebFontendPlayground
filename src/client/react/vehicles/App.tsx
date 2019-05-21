import * as React from 'react'
import {ReactNode} from 'react'
import * as ReactDOM from 'react-dom'
import {none, Option, some} from 'fp-ts/lib/Option'
import Vehicles from "./Vehicles"

interface ErrorState {
    error: Option<Error>
}

class ErrorBoundary extends React.Component<{},ErrorState> {
    constructor(){
        super({})
        this.state = {
            error:none
        }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        this.setState({
            error:some(error)
        })
    }

    render():ReactNode{
        return this.state.error.isSome() ? (
                    <p>Very sorry but there was an error</p>
                ) : (this.props.children)
    }

}
class App extends React.Component {

    render(): React.ReactNode {
        return (
            <div>
                <h1>Star Wars Vehicles</h1>
                <ErrorBoundary>
                    <Vehicles />
                </ErrorBoundary>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById("container"))