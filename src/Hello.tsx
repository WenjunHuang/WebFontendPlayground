import * as React from "react";

export interface HelloProps {
    compiler: string
    framework: string
    message: string
}

// export const Hello = (props: HelloProps) => <h1>Hello from {props.compiler} and {props.framework}!</h1>;
export class Hello extends React.Component<HelloProps, {}> {
    constructor(props: HelloProps) {
        super(props)
    }

    render(): React.ReactNode {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}! and {this.props.message}</h1>;
    }
}