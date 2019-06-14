import * as React from 'react'
import "./App.scss"
import Tree from "antd/lib/tree"

export default class App extends React.Component<{}, {}> {
    render() {
        return (
            <Tree checkable={true} checkStrictly={true}>
                <Tree.TreeNode title="root">
                    <Tree.TreeNode title="parent 1" checked={true} checkable={true}/>
                    <Tree.TreeNode title="parent 2"/>
                </Tree.TreeNode>
            </Tree>
        )
    }
}