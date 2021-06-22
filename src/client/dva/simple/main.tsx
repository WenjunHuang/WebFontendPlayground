import * as React from 'react'
import dva from 'dva'

const App = () => (<div>Hello dva</div>);

const app = dva()

// 注册 Model
app.model({
    namespace:'count',
    state: 0,
    reducers: {
        add(state){return state + 1;},
    },
    effects:{
        // *addAfter1Second(action,{call,put}) {
        //     yield call(delay,1000)
        //
        // }
    }
})
// 注册视图
app.router(()=><App />)

// 启动应用
app.start('#root')
