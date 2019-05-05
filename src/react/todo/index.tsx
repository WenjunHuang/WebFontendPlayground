import * as React from 'react'
import {createStore} from 'redux'
import {rootReducer} from './reducers'
import {render} from "react-dom";
import App from "./components/App";
import {Provider} from "react-redux";

const store = createStore(rootReducer);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('container')
)
