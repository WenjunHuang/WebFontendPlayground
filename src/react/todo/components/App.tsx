import * as React from 'react'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from "../containers/VisibleTodoList";
import Footer from "./Footer";

export default class App extends React.Component<{}, {}> {
    render() {
        return <div>
            <AddTodo/>
            <VisibleTodoList/>
            <Footer/>
        </div>
    }

}