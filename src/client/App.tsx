import * as React from 'react'
import Button from 'antd/lib/button'
import "./App.scss"

export default class App extends React.Component<{}, {}> {
    render() {
        return <div className="App">
            <Button type="primary">Button</Button>
        </div>
    }
}