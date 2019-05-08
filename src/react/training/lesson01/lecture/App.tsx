import * as React from 'react'
import * as ReactDom from 'react-dom'
import "./index.scss"
import createOscillator, {Oscillator} from "./createOscillator"
import {SineWave} from "./SineWave"


interface ToneProps {
    isPlaying: boolean
    pitch: number
    volume: number
}
class Tone extends React.Component<ToneProps> {
    oscillator: Oscillator

    constructor(props:ToneProps){
        super(props)
        this.oscillator = createOscillator()
    }

    doImperativeStuff() {
        const {isPlaying, pitch, volume} = this.props
        if (isPlaying){
            this.oscillator.play()
        }else {
            this.oscillator.stop()
        }
        this.oscillator.setPitchBend(pitch)
        this.oscillator.setVolume(volume)
    }

    componentDidMount(): void {
        this.doImperativeStuff()
    }

    componentDidUpdate(): void {
        this.doImperativeStuff()
    }

    render() {
        return null
    }
}

interface AppState {
    isPlaying: boolean
    pitch: number
    volume: number
}

class App extends React.Component<{}, AppState> {

    constructor() {
        super({})

        this.state = {
            isPlaying: false,
            pitch: 0,
            volume: 0
        }

    }


    play() {
        this.setState(() => ({
            isPlaying: true
        }))
    }

    stop() {
        this.setState(() => ({
            isPlaying: false
        }))
    }

    changeTone(event: React.MouseEvent<HTMLDivElement>) {
        const {clientX, clientY} = event
        const {top, right, bottom, left} = (event.target as HTMLDivElement).getBoundingClientRect()
        const pitch = (clientX - left) / (right - left)
        const volume = 1 - (clientY - top) / (bottom - top)
        this.setState({pitch, volume})
    }

    render() {
        return (
            <div className="App">
                <div
                    className="theremin"
                    onMouseEnter={() => this.play()}
                    onMouseLeave={() => this.stop()}
                    onMouseMove={(event) => this.changeTone(event)}>
                    <SineWave amplitude={this.state.volume} frequency={this.state.pitch} draw={this.state.isPlaying} width="400px" height="400px" />
                    <Tone isPlaying={this.state.isPlaying} pitch={this.state.pitch} volume={this.state.volume}/>
                </div>
                <div className="label pitch">Pitch</div>
                <div className="label volume">Volume</div>
            </div>
        )
    }
}

ReactDom.render(<App/>, document.getElementById("container"))