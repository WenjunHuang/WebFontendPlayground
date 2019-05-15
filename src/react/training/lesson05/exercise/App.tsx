import * as React from 'react'
import * as ReactDOM from 'react-dom'
import LoadingDots from "./LoadingDots"
import Map from './Map'
import GeoPosition from './GeoPosition'
import './style.scss'


class App extends React.Component {

    constructor() {
        super({})
    }

    render() {
        return (
            <GeoPosition render={(position, error) => (
                <div className="app">
                    {error ? (
                        <div>Error: {error}</div>
                    ) : position ? (
                        <Map lat={position.lat}
                             lng={position.lng}
                             info="You are here"/>
                    ) : (<LoadingDots interval={300} dots={3}/>)}
                </div>
            )}
            />
        )
    }

}

ReactDOM.render(<App/>, document.getElementById("container"))