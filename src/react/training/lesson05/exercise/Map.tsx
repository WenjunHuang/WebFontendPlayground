import * as React from 'react'
import {GoogleMap, InfoWindow, Marker, withGoogleMap} from 'react-google-maps'

declare global {
    interface Window {
        _mapsLoaded?: any
        google?: any
    }
}

const loadMaps = (cb: () => void) => {
    const KEY = 'AIzaSyDFwu1MmuOatqW-283LSCbsxqHcp89ouiw'
    const URL = `https://maps.googleapis.com/maps/api/js?key=${KEY}&callback=_mapsLoaded`
    window._mapsLoaded = cb

    const script = document.createElement('script')
    script.src = URL
    document.body.appendChild(script)

}

interface MapProps {
    lat: number
    lng: number
    info: string
}

const InnerMap = withGoogleMap<MapProps>((props: MapProps) => {
    const {lat, lng, info} = props
    return (
        <GoogleMap defaultZoom={5} center={{lat, lng}}>
            <Marker position={{lat, lng}} defaultAnimation={google.maps.Animation.DROP}>
                {info && <InfoWindow>
                    <div>{info}</div>
                </InfoWindow>}
            </Marker>

        </GoogleMap>)
})

export default class Map extends React.Component<MapProps> {
    constructor(props: MapProps) {
        super(props)
    }

    componentWillMount(): void {
        if (!window.google) {
            loadMaps(() => {
                this.forceUpdate()
            })
        }
    }

    render() {
        const {lat, lng, info} = this.props

        return window.google ? (
            <InnerMap
                containerElement={<div className="container"/>}
                mapElement={<div className="map"/>}
                lat={lat}
                lng={lng}
                info={info}
            />
        ) : null
    }
}