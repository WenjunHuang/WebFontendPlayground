import * as React from 'react'
import Button from 'antd/lib/button'
import 'antd/dist/antd.css';

export default class Buttons extends React.Component {
    render() {
        return <div style={{padding: "24px"}}>
            <Button type="primary">Primary</Button>
            <Button>Default</Button>
            <Button type="dashed">Dashed</Button>
            <Button type="dashed">Dashed</Button>
        </div>
    }
}