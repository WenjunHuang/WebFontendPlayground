import * as React from 'react'

export interface SineWaveProps {
    amplitude: number
    frequency: number
    draw: boolean
    width: string
    height: string
}

export class SineWave extends React.Component<SineWaveProps> {
    node?: HTMLCanvasElement
    ctx?: CanvasRenderingContext2D
    width: number = 0
    height: number = 0

    constructor(props: SineWaveProps) {
        super(props)
    }

    componentDidMount(): void {
        if (this.node) {
            this.ctx = this.node.getContext("2d")!
            const {width, height} = this.node.getBoundingClientRect()
            this.width = width
            this.height = height
        }
    }

    componentDidUpdate(prevProps: Readonly<SineWaveProps>): void {
        if (!prevProps.draw && this.props.draw)
            this.renderCanvas()
    }

    renderCanvas(force: boolean = false) {
        let phi = 0
        let frames = 0
        const {height, width} = this
        const ctx = this.ctx!
        ctx.lineWidth = 4

        const draw = () => {
            const amplitude = height * this.props.amplitude
            const frequency = this.props.frequency / 2
            const offset = (height - amplitude) / 2

            frames++
            phi = frames / 30

            ctx.clearRect(0, 0, width, height)
            ctx.strokeStyle = "white"
            ctx.moveTo(0, height)
            ctx.beginPath()
            for (let x = 0; x < width; x++) {
                let y = Math.sin(x * frequency + phi) * amplitude / 2 + amplitude / 2
                ctx.lineTo(x, y + offset)
            }
            ctx.stroke()

            if (this.props.draw){
                window.requestAnimationFrame(draw)
            }
        }

        if (force||this.props.draw) {
            window.requestAnimationFrame(draw)
        }

    }

    render() {
        return (
            <canvas ref={n => this.node = n!}
                    width={this.props.width}
                    height={this.props.height}/>

        )
    }
}