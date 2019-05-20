import * as React from 'react'
import {Todo} from './Todo'
import {TodoItem} from "../models";

export interface TodoListProps {
    todos: TodoItem[]
    onTodoClick: (index: number) => void
}

export class TodoList extends React.Component<TodoListProps> {
    constructor(props: TodoListProps) {
        super(props)
    }

    render(): React.ReactNode {
        return <ul>
            {this.props.todos.map((todo, index) => (
                <Todo key={index}  {...todo} onClick={() => this.props.onTodoClick(index)}/>
            ))}
        </ul>
    }

}