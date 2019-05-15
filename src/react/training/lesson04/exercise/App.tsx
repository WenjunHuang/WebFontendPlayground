import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {get, set, subscribe} from './localStorage'
import {FaBars} from "react-icons/fa"
import "./index.scss"

interface AppState {
    sideBarIsOpen: boolean
}

class App extends React.Component<{}, AppState> {
    unsubscribe?: () => void

    constructor() {
        super({})
        const isOpen = get('sidebarIsOpen')
        this.state = {
            sideBarIsOpen: (isOpen !== null) ? JSON.parse(isOpen) : true
        }
    }

    componentDidMount(): void {
        this.unsubscribe = subscribe(() => {
            console.log("triggered")
            const isOpen = get('sideBarIsOpen')
            this.setState({
                sideBarIsOpen: (isOpen !== null) ? JSON.parse(isOpen) : true
            })
        })
    }

    componentWillUnmount(): void {
        if (this.unsubscribe)
            this.unsubscribe()
    }

    render() {
        const {sideBarIsOpen} = this.state

        return (
            <div className="app">
                <header>
                    <button className="sidebar-toggle"
                            title="Toggle menu"
                            onClick={() => {
                                set('sideBarIsOpen', JSON.stringify(!sideBarIsOpen))
                            }}>
                        <FaBars/>
                    </button>
                </header>
                <div className="container">
                    <aside className={sideBarIsOpen? 'open':'closed'}/>
                    <main >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </main>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />,document.getElementById("container"))
