export const TOGGLE_TODO = 'TOGGLE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

interface AddTodo {
    type: typeof ADD_TODO
    id: number
    text: string
    completed: boolean
}

interface ToggleTodo {
    type: typeof TOGGLE_TODO
    id: number
}

export type VisibilityFilters = "SHOW_ALL" | "SHOW_COMPLETED" | "SHOW_ACTIVE"

interface SetVisibilityFilter {
    type: typeof SET_VISIBILITY_FILTER
    filter: VisibilityFilters
}

export type TodoActionTypes = AddTodo | ToggleTodo
export type FilterActionTypes = SetVisibilityFilter

let currentIdNum = 0

export function addTodo(text: string, completed = false): TodoActionTypes {
    return {
        type: ADD_TODO,
        id: currentIdNum++,
        text,
        completed
    }
}

export function toggleTodo(id: number): TodoActionTypes {
    return {
        type: TOGGLE_TODO,
        id: id
    }
}

export function setVisibilityFilter(filter: VisibilityFilters): FilterActionTypes {
    return {
        type: SET_VISIBILITY_FILTER,
        filter: filter
    }
}