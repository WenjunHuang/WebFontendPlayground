import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {FaBackward, FaForward, FaPause, FaPlay} from "react-icons/fa"
import './index.scss'

interface RadioGroupProps {
    legend: string
}

interface RadioGroupState {
    selectedValue?: string
}

class RadioGroup extends React.Component<RadioGroupProps, RadioGroupState> {
    constructor(props: RadioGroupProps) {
        super(props)

        this.state = {}
    }

    selectRadio = (value: string) => {
        this.setState({
            selectedValue: value
        })
    }

    render() {
        const children = React.Children.map(this.props.children, (child) => {
            if (React.isValidElement<RadioButtonProps>(child)) {
                return React.cloneElement(child, {
                    isActive: child.props.value === this.state.selectedValue,
                    onSelect: () => {
                        this.selectRadio(child.props.value)
                    }
                })
            } else {
                return child
            }
        })
        return (
            <fieldset className="radio-group">
                <legend>{this.props.legend}</legend>
                {children}
            </fieldset>
        )
    }
}

interface RadioButtonProps {
    value: string
    isActive?: boolean
    onSelect?: () => void
}

class RadioButton extends React.Component<RadioButtonProps> {
    constructor(props: RadioButtonProps) {
        super(props)
    }

    render() {
        const {isActive, onSelect} = this.props
        const className = 'radio-button ' + (isActive ? 'active' : '')
        return (
            <button className={className} onClick={()=>onSelect!()}>
                {this.props.children}
            </button>
        )
    }
}

class App extends React.Component {
    render() {
        return (
            <div>
                <RadioGroup legend="Radio Group">
                    <RadioButton value="back"><FaBackward/></RadioButton>
                    <RadioButton value="play"><FaPlay/></RadioButton>
                    <RadioButton value="pause"><FaPause/></RadioButton>
                    <RadioButton value="forward"><FaForward/></RadioButton>
                </RadioGroup>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById("container"))