import * as React from 'react'
import * as ReactDOM from 'react-dom'

interface SelectProps {
    onChange: () =>void
    value?: any
    default: any
}

interface SelectState {
    value?: any
    isOpen: boolean
}

class Select extends React.Component<SelectProps,SelectState> {
    constructor(props:SelectProps) {
        super(props)
        this.state = {
            value: props.value,
            isOpen: false
        }
    }

    isControlled() {
        return this.props.value !== undefined
    }

    render() {
        const {isOpen} = this.state
        let label
        const children = React.Children.map(this.props.children,(child) => {
            if (React.isValidElement<OptionProps>(child)) {
                const {value} = this.isControlled() ? this.props : this.state
                if (child!.props.value === value) {
                    child!.props.children

                }
            }
        })
    }
}

interface OptionProps {
   value: string
}