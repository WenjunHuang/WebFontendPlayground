import * as React from 'react'
import "./App.scss"
import Tree from "antd/lib/tree"
import {none, Option, some} from "fp-ts/lib/Option"

export type CheckState = 'Empty' | 'Half' | 'Checked'

export interface TreeData {
    checkedState: CheckState
    title: string
    key: string
}

export interface TreeNode {
    parent: Option<TreeNode>
    data: TreeData
    children: TreeNode[]
}


interface AppProps {
    tree: TreeNode
}

function renderSubTree(node: TreeNode, checked: string[], halfChecked: string[]) {
    switch (node.data.checkedState) {
        case 'Empty':
            break
        case 'Checked':
            checked.push(node.data.key)
            break
        case 'Half':
            halfChecked.push(node.data.key)
            break
    }

    return (
        <Tree.TreeNode key={node.data.key} title={node.data.title} dataRef={node}>
            {
                node.children.map((value) => {
                    return renderSubTree(value, checked, halfChecked)
                })
            }
        </Tree.TreeNode>
    )
}

function calculateNodeStateOnlyAccordingToChildrenState(node: TreeNode) {
    let newState: Option<CheckState> = none
    for (const n of node.children) {
        const childState: CheckState = n.data.checkedState
        if (newState.isNone()) {
            newState = some(childState)
        } else {
            const last = newState.value
            if (childState === 'Half') {
                newState = some('Half')
            } else {
                if (last === 'Checked') {
                    switch (childState) {
                        case 'Checked':
                            newState = some('Checked')
                            break
                        case 'Empty':
                            newState = some('Half')
                            break
                    }
                } else if (last === 'Empty') {
                    switch (childState) {
                        case 'Checked':
                            newState = some('Half')
                            break
                        case 'Empty':
                            newState = some('Empty')
                            break
                    }
                }
            }
        }

        if (newState.isSome() && newState.value === 'Half')
            break
    }

    if (newState.isSome()) {
        node.data.checkedState = newState.value
    }

    if (node.parent.isSome()) {
        calculateNodeStateOnlyAccordingToChildrenState(node.parent.value)
    }
}


function updateChildrenState(node: TreeNode, state: CheckState) {
    node.children.forEach((child) => {
        child.data.checkedState = state
        updateChildrenState(child, state)
    })
}

interface AppState {
    tree: TreeNode
}

export class AppClass extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)
        this.state = {
            tree: props.tree
        }
    }

    onNodeCheck(node: TreeNode) {
        this.setState(() => {
            switch (node.data.checkedState) {
                case 'Empty':
                    node.data.checkedState = 'Checked'
                    break
                case 'Half':
                    node.data.checkedState = 'Checked'
                    break
                case 'Checked':
                    node.data.checkedState = 'Empty'
                    break
            }

            if (node.parent.isSome())
                calculateNodeStateOnlyAccordingToChildrenState(node.parent.value)

            updateChildrenState(node, node.data.checkedState)

        })
        this.forceUpdate()
    }

    render() {
        const checked: string[] = []
        const halfChecked: string[] = []
        return (
            <Tree checkable={true}
                  checkStrictly={true}
                  checkedKeys={{checked, halfChecked}}
                  onCheck={(_, e) => this.onNodeCheck(e.node.props.dataRef)}>
                {
                    renderSubTree(this.state.tree, checked, halfChecked)
                }
            </Tree>
        )
    }

}


export const App = (props: AppProps) => {

    const [tree, setTree] = React.useState(() => props.tree)
    const [_, forceUpdate] = React.useReducer((x) => x + 1, 0)
    const onNodeCheck = (node: TreeNode) => {
        switch (node.data.checkedState) {
            case 'Empty':
                node.data.checkedState = 'Checked'
                break
            case 'Half':
                node.data.checkedState = 'Checked'
                break
            case 'Checked':
                node.data.checkedState = 'Empty'
                break
        }

        if (node.parent.isSome())
            calculateNodeStateOnlyAccordingToChildrenState(node.parent.value)

        updateChildrenState(node, node.data.checkedState)

        forceUpdate(0)
    }

    const checked: string[] = []
    const halfChecked: string[] = []

    return (
        <Tree checkable={true}
              checkStrictly={true}
              checkedKeys={{checked, halfChecked}}
              onCheck={(_, e) => onNodeCheck(e.node.props.dataRef)}>
            {
                renderSubTree(tree, checked, halfChecked)
            }
        </Tree>
    )
}

