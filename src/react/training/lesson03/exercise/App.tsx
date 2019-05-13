import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {FaPause, FaPlay, FaRedo, FaUndo} from "react-icons/fa"
import mario from "./mariobros.mp3"
import podcast from "./podcast.mp3"
import './index.scss'

interface AudioPlayerContextData {
    isPlaying: boolean
    duration: number
    currentTime: number
    play?: () => void
    pause?: () => void
    forward?: (seconds: number) => void
    backward?: (seconds: number) => void
    moveTo?: (seconds: number) => void
}

const AudioPlayerContext = React.createContext<AudioPlayerContextData>({
    isPlaying: false,
    duration: 0,
    currentTime: 0
})

interface AudioPlayerProps {
    source: string
}

interface AudioPlayerState {
    isPlaying: boolean
    duration: number
    currentTime: number
}

class AudioPlayer extends React.Component<AudioPlayerProps, AudioPlayerState> {
    audio: HTMLAudioElement | null = null

    constructor(props: AudioPlayerProps) {
        super(props)
        this.state = {
            isPlaying: false,
            duration: 0,
            currentTime: 0
        }
    }

    play = () => {
        if (this.audio !== null) {
            this.audio.play()
                .then(() => {
                    this.setState({
                        isPlaying: true
                    })
                })
        }
    }

    pause = () => {
        if (this.audio !== null) {
            this.audio.pause()
            this.setState({
                isPlaying: false
            })

        }
    }

    onLoadedData = () => {
        if (this.audio !== null) {
            const duration = this.audio.duration
            this.setState({
                duration
            })
        }
    }

    onTimeUpdate = () => {
        if (this.audio !== null) {
            const currentTime = this.audio.currentTime
            this.setState({
                currentTime
            })
        }
    }

    onEnded = () => {
        this.setState({
            isPlaying: false
        })
    }

    forward = (seconds: number) => {
        if (this.audio && this.state.isPlaying) {
            const currentTime = this.audio.currentTime
            this.audio.currentTime = currentTime + seconds
        }
    }

    backward = (seconds: number) => {
        if (this.audio && this.state.isPlaying) {
            const currentTime = this.audio.currentTime
            this.audio.currentTime = currentTime - seconds
        }
    }

    moveTo = (seconds:number) => {
        if (this.audio && this.state.isPlaying) {
            this.audio.currentTime = seconds
        }
    }

    render() {
        return (
            <div className="audio-player">
                <audio src={`/${this.props.source}`}
                       onTimeUpdate={this.onTimeUpdate}
                       onLoadedData={this.onLoadedData}
                       onEnded={this.onEnded}
                       ref={(n) => {
                           this.audio = n
                       }}/>
                <AudioPlayerContext.Provider value={{
                    isPlaying: this.state.isPlaying,
                    duration: this.state.duration,
                    currentTime: this.state.currentTime,
                    play: this.play,
                    pause: this.pause,
                    forward: this.forward,
                    backward: this.backward,
                    moveTo: this.moveTo
                }}>
                    {this.props.children}
                </AudioPlayerContext.Provider>
            </div>
        )
    }
}

class Play extends React.Component {
    static contextType = AudioPlayerContext
    context!: React.ContextType<typeof AudioPlayerContext>

    render() {
        const context = this.context

        return (
            <button className="icon-button"
                    onClick={() => {
                        if (context.play) {
                            context.play()
                        }
                    }}
                    disabled={context!.isPlaying}
                    title="play">
                <FaPlay/>
            </button>
        )
    }
}

class Pause extends React.Component {
    static contextType = AudioPlayerContext
    context!: React.ContextType<typeof AudioPlayerContext>

    render() {
        return (
            <button className="icon-button"
                    onClick={() => {
                        if (this.context.pause)
                            this.context.pause()
                    }}
                    disabled={!this.context.isPlaying}
                    title="pause">
                <FaPause/>
            </button>
        )
    }
}

class PlayPause extends React.Component {
    static contextType = AudioPlayerContext
    context!: React.ContextType<typeof AudioPlayerContext>

    render() {
        if (!this.context.isPlaying) {
            return (
                <Play/>
            )
        } else {
            return <Pause/>
        }
    }
}

class JumpForward extends React.Component {
    static contextType = AudioPlayerContext
    context!: React.ContextType<typeof AudioPlayerContext>

    render() {
        return (
            <button className="icon-button"
                    onClick={() => {
                        if (this.context.forward)
                            this.context.forward(10)
                    }}
                    disabled={undefined}
                    title="Forward 10 Seconds">
                <FaRedo/>
            </button>
        )
    }
}

class JumpBack extends React.Component {
    static contextType = AudioPlayerContext
    context!: React.ContextType<typeof AudioPlayerContext>

    render() {
        return (
            <button className="icon-button"
                    onClick={() => {
                        if (this.context.backward) {
                            this.context.backward(10)
                        }
                    }}
                    disabled={undefined}
                    title="Back 10 Seconds">
                <FaUndo/>
            </button>
        )
    }
}

class Progress extends React.Component {
    static contextType = AudioPlayerContext
    context!: React.ContextType<typeof AudioPlayerContext>
    node?:HTMLDivElement


    render() {
        return (
            <div ref={(n)=>this.node = n!}
                className="progress"
                 onClick={event =>{
                     if (this.node && this.context.moveTo) {
                         const {clientX} = event
                         const {left,width} = this.node.getBoundingClientRect()
                         const ratio = (clientX - left) /width
                         const moveTo = ratio * this.context.duration
                         this.context.moveTo(moveTo)
                     }
                 }}>
                <div className="progress-bar"
                     style={{
                         width: `${(this.context.currentTime / this.context.duration) * 100.0}%`
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
                    <Progress/>
                </AudioPlayer>

                <AudioPlayer source={podcast}>
                    <PlayPause/><JumpBack/><JumpForward/>{' '}
                    <span className="player-text">React30 Episode 010: React Virtualized</span>
                    <Progress/>
                </AudioPlayer>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById("container"))
