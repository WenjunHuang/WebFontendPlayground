import * as React from 'react'

export interface TodoProps {
    onClick: (event: React.MouseEvent) => void
    completed: boolean
    text: string
}

export class Todo extends React.Component<TodoProps> {
    constructor(props: TodoProps) {
        super(props)
    }

    render(): React.ReactNode {
        return <li
            onClick={this.props.onClick}
            style={{
                textDecoration: this.props.completed ? 'line-through' : 'none'
            }}>{this.props.text}</li>
    }
}