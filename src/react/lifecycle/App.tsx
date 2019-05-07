import * as React from 'react'
import * as ReactDOM from 'react-dom'

const logMessage = (from: string, msg: string) => {
    console.log(`[${from}] ${msg}`)
}

const logComponentWillMount = (obj: object) => {
    logMessage(obj.constructor.name, "componentWillMount")
}

const logComponentDidMount = (obj: object) => {
    logMessage(obj.constructor.name, "componentDidMount")
}

const logComponentWillReceiveProps = (obj: object) => {
    logMessage(obj.constructor.name, "componentWillReceiveProps")
}

class Parent extends React.Component {

    componentWillReceiveProps(nextProps: Readonly<{}>, nextContext: any): void {
        logComponentWillReceiveProps(this)
    }

    componentWillUnmount(): void {
    }

    componentWillMount(): void {
        logComponentWillMount(this)
    }

    componentDidMount(): void {
        logComponentDidMount(this)
    }

    render() {
        return (
            <div>Parent {this.props.children}
            </div>
        )

    }
}

class Child extends React.Component {
    componentDidMount(): void {
        logComponentDidMount(this)
    }

    componentWillMount(): void {
        logComponentWillMount(this)
    }

    render() {
        return (
            <div>Child</div>
        )
    }
}

ReactDOM.render((<Parent><Child/></Parent>), document.getElementById("container"))

