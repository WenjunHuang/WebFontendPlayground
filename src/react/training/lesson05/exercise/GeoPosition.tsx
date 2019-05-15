import * as React from 'react'

interface GeoPositionState {
    coords?: { lat: number, lng: number }
    error?: string
}
interface GeoPositionProps {
    render: (position?:{lat:number,lng:number},error?:string)=>React.ReactNode
}

export default class GeoPosition extends React.Component<GeoPositionProps,GeoPositionState> {

    constructor(props:GeoPositionProps){
        super(props)
        this.state = {}
    }

    componentDidMount(): void {
        this.setState({
            coords:{
                lat:23.1292871,
                lng:113.3009978
            }
        })
    }

    render() {
        return this.props.render(this.state.coords,this.state.error)
    }
}