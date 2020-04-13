import * as React from 'react';
import dva, {connect} from 'dva';
import "./style.scss";

// 1 Initialize
const app = dva();

// 2 Model
app.model({
    namespace: 'count',
    state: 0,
    reducers: {
        add: (count) => {
            return count + 1
        },
        minus: (count) => {
            return count - 1
        },
    },
    effects: {
        *add(action,{put}) {
            console.log(action)
            //yield call(delay, 1000);
            yield put({type:'minus'})
        }
    }
});

class TestError extends React.Component<any, any> {
    render(): React.ReactNode {
        return <div>TestError</div>
    }
}


// 3.View
const App = connect(({count}) => ({count}))((props) => {
    return (
        <div>
            <TestError/>
            <h2>{props.count}</h2>
            <button key="add" onClick={() => {
                props.dispatch({type: 'count/add'})
            }}>+
            </button>
            <button key="minus" onClick={() => {
                props.dispatch({type: 'count/minus'})
            }}>-
            </button>
        </div>
    )
})

app.router(() => <App/>)
app.start("#root")