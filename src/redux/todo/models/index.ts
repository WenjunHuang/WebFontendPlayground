import {VisibilityFilters} from "../actions";

export interface TodoItem{
    id: number
    text: string
    completed: boolean
}

export interface TodosState{
    todos:TodoItem[]
}

export interface FilterState{
    filter:VisibilityFilters
}