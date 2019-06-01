import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Home from './pages/Home'
import GlobalStyles from './components/globals/GlobalStyles'
const App = () => {
    return (
        <>
            <GlobalStyles />
            <Home/>
        </>
    )
}

ReactDOM.render(<App/>, document.getElementById("container"))