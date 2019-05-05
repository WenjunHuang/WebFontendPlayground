import * as React from 'react'

export interface LinkProps {
    active: boolean
    children: React.ReactNode
    onClick: () => void
}

export class Link extends React.Component<LinkProps> {
    constructor(props: LinkProps) {
        super(props)
    }

    render(): React.ReactNode {
        return (
            <button
                style={{
                    marginLeft: '4px'
                }}
                disabled={this.props.active}
                onClick={e => {
                   e.preventDefault()
                   this.props.onClick()
               }}>{this.props.children}</button>
        )
    }

}