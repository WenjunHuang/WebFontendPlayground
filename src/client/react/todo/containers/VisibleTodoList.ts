import {toggleTodo, VisibilityFilters} from "../actions";
import {TodoItem} from "../models";
import {AppState} from "../reducers";
import {Action, Dispatch} from "redux";
import {connect} from "react-redux";
import {TodoList} from "../components/TodoList";

const getVisibleTodos = (todos: TodoItem[], filter: VisibilityFilters) => {
    switch (filter) {
        case "SHOW_ALL":
            return todos
        case "SHOW_COMPLETED":
            return todos.filter(t => t.completed)
        case "SHOW_ACTIVE":
            return todos.filter(t => !t.completed)
        default:
            throw new Error(`Unknown filter:${filter}`)
    }
}

const mapStateToProps = (state: AppState) => ({
    todos: getVisibleTodos(state.todos.todos, state.visibilityFilter.filter)
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    onTodoClick: (id: number) => dispatch(toggleTodo(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)