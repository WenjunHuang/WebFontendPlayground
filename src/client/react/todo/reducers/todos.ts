import {TodosState} from "../models";
import {ADD_TODO, TodoActionTypes, TOGGLE_TODO} from "../actions";

const initialTodosState: TodosState = {
    todos: []
}

export default function todos(state = initialTodosState, action: TodoActionTypes): TodosState {
    switch (action.type) {
        case ADD_TODO:
            return {
                todos: [...state.todos, {id: action.id, text: action.text, completed: action.completed}]
            }
        case TOGGLE_TODO:
            return {
                todos: state.todos.map(item => (item.id === action.id ? {
                    ...item,
                    completed: !item.completed
                } : item))
            }
        default:
            return state
    }
}