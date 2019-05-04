import * as React from "react"
import {connect} from "react-redux"
import {none, Option,some} from "fp-ts/lib/Option";
import {Action, Dispatch} from "redux";
import {addTodo} from "../actions";

interface AddTodoProps{
    dispatch:Dispatch<Action>
}
class AddTodo extends React.Component<AddTodoProps> {
    input:Option<HTMLInputElement> = none
    constructor(props:AddTodoProps){
        super(props)
    }

    render():React.ReactNode {
        return <div>
            <form onSubmit={e =>{
                e.preventDefault()
                if (this.input.isSome()){
                    const value = this.input.value
                    if (!value.value.trim())
                        return
                    this.props.dispatch(addTodo(value.value))
                    this.input.value.value =  ''
                }
            }}>
                <input ref={node=>this.input = some(node!)}/>
                <button type="submit">Add Todo</button>
            </form>
        </div>

    }
}

export default connect()(AddTodo)