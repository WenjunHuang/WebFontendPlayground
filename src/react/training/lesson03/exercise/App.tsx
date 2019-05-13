import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {FaPause, FaPlay, FaRedo, FaUndo} from "react-icons/fa"
import mario from "./mariabros.mp3"
import podcast from "./podcast.mp3"
import './index.scss'

interface AudioPlayerProps{
    source:string
}

class AudioPlayer extends React.Component<AudioPlayerProps> {
    audio:HTMLAudioElement|null = null

    constructor(props:AudioPlayerProps){
        super(props)
    }

    render() {
        return (
            <div className="audio-player">
                <audio src={undefined}
                       onTimeUpdate={undefined}
                       onLoadedData={undefined}
                       onEnded={undefined}
                       ref={n => this.audio = n }/>
                {this.props.children}
            </div>
        )
    }
}

class Play extends React.Component {
    render() {
        return (
            <button className="icon-button"
                    onClick={undefined}
                    disabled={undefined}
                    title="play">
               <FaPlay />
            </button>
        )
    }
}

class Pause extends React.Component {
    render() {
        return (
            <button className="icon-button"
                    onClick={undefined}
                    disabled={undefined}
                    title="pause">
                <FaPause />
            </button>
        )
    }
}

class PlayPause extends React.Component {
    render() {
        return null
    }
}

class JumpForward extends React.Component {
    render() {
        return (
            <button className="icon-button"
                    onClick={undefined}
                    disabled={undefined}
                    title="Forward 10 Seconds">
                <FaRedo />
            </button>
        )
    }
}

class JumpBack extends React.Component {
    render() {
        return (
            <button className="icon-button"
                    onClick={undefined}
                    disabled={undefined}
                    title="Back 10 Seconds">
                <FaUndo />
            </button>
        )
    }
}

class Progress extends React.Component {
    render() {
        return (
            <div className="progress"
                 onClick={undefined}>
                <div className="progress-bar"
                style={{
                    width: '23%'
                }}>
                </div>
            </div>
        )
    }
}

class App extends React.Component {
    render() {
        return (
            <div className="exercise">
                <AudioPlayer source={mario}>
                    <Play/><Pause/>{' '}
                    <span className="player-text">Mario Bros. Remix</span>
                    <Progress />
                </AudioPlayer>

                <AudioPlayer source={podcast}>
                    <PlayPause /><JumpBack /><JumpForward />{' '}
                    <span className="player-text">React30 Episode 010: React Virtualized</span>
                    <Progress />
                </AudioPlayer>
            </div>
        )
    }
}

ReactDOM.render(<App />,document.getElementById("container"))
