import Record from "dataclass";
import {Action} from "redux";

interface TodoAction {
    actOn(items: TodoItem[]): TodoItem[]
}

class TodoItem extends Record<TodoItem> {
    id: number = 0
    text: string = ""
    completed: boolean = false
}

class AddTodo extends Record<AddTodo> implements TodoAction {
    id: number = 0
    text: string = ""

    actOn(items: TodoItem[]): TodoItem[] {
        return [...items, new TodoItem({id: this.id, text: this.text, completed: false})];
    }
}

type VisibilityFilters = "SHOW_ALL" | "SHOW_COMPLETED" | "SHOW_ACTIVE"

class SetVisibilityFilter extends Record<SetVisibilityFilter> {
    filter: VisibilityFilters = "SHOW_ALL"
}

export class ToggleTodo extends Record<ToggleTodo> implements TodoAction {
    id: number = 0

    actOn(items: TodoItem[]): TodoItem[] {
        return items.map(todo =>
            (todo.id === this.id) ? todo.copy({completed: !todo.completed}) : todo
        );
    }
}

// type TodoAction = AddTodo | SetVisibilityFilter | ToggleTodo

export function todos(state: TodoItem[] = [], action: Action<TodoAction>): TodoItem[] {
    return action.type.actOn(state)
}