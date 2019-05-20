import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {createBrowserHistory, History, Location} from 'history'
import {MouseEvent} from "react"

interface RouterContextType {
    history?: History
}

const RouterContext = React.createContext<RouterContextType>({})

class Router extends React.Component {
    history: History = createBrowserHistory()
    unsubscribe?: () => void

    componentDidMount(): void {
        this.unsubscribe = this.history.listen(() => this.forceUpdate())
    }

    componentWillUnmount(): void {
        if (this.unsubscribe)
            this.unsubscribe()
    }

    render() {
        return (
            <RouterContext.Provider value={{history: this.history}}>
                {this.props.children}
            </RouterContext.Provider>
        )
    }
}

interface RouteProps {
    exact?: boolean
    path: string
    render?: () => React.ReactElement
    component?: React.ComponentType
}

class Route extends React.Component<RouteProps> {
    static contextType = RouterContext
    context!: React.ContextType<typeof RouterContext>

    constructor(props: RouteProps) {
        super(props)
    }

    render() {
        const {path, exact, render, component: Component} = this.props
        const {location} = this.context.history!
        const match = exact ? location.pathname === path
            : location.pathname.startsWith(path)

        if (match) {
            if (render) {
                return render()
            } else if (Component) {
                return <Component/>
            } else {
                return null
            }
        } else {
            return null
        }
    }
}

interface LinkProps {
    to: string
}

class Link extends React.Component<LinkProps> {
    static contextType = RouterContext
    context!: React.ContextType<typeof RouterContext>

    constructor(prop: LinkProps) {
        super(prop)
    }

    handleClick = (e: MouseEvent) => {
        e.preventDefault()
        this.context.history!.push(this.props.to)
    }

    render() {
        return (
            <a href={`${this.props.to}`}
               onClick={this.handleClick}>
                {this.props.children}
            </a>
        )
    }
}

export {Router, Route, Link}