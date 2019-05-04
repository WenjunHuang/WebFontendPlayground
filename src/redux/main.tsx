import {Action, createStore, Store} from 'redux'
import * as React from "react";
import * as ReactDOM from "react-dom";
import Record from 'dataclass'



let store = createStore(counter);

type SpinProps = { store: Store<number, Action<string>> }

class Spin extends React.Component<SpinProps, { counter: number }> {
    constructor(props: SpinProps) {
        super(props);
        console.log(props.store.getState())

        this.state = {counter: props.store.getState()}

        props.store.subscribe(() => {
            this.setState({counter: this.props.store.getState()})
        })
    }

    render() {
        return <div>
            <button type="button" onClick={() => this.props.store.dispatch({type: 'INCREMENT'})}>+</button>
            <span>{this.state.counter}</span>
            <button type="button" onClick={() => this.props.store.dispatch({type: 'DECREMENT'})}>-</button>
        </div>;
    }
}

ReactDOM.render(
    <Spin store={store}/>,
    document.getElementById("container")
);
