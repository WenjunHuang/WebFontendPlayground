import * as React from "react";
import * as ReactDOM from "react-dom";
import {App, CheckState, TreeNode} from "./App";
import {none, some} from "fp-ts/lib/Option"


function generateSubNode(parent:TreeNode,count:number,level:number) {
    if (level === 0)
        return
    else {
        for (let i = 0;i<count;i++){
            const child:TreeNode = {
                parent:some(parent),
                data:{
                    checkedState:'Empty',
                    title:`${parent.data.title}-${i}`,
                    key:`${parent.data.key}-${i}`
                },
                children:[]
            }
            generateSubNode(child,count,level - 1)
            parent.children.push(child)
        }
    }
}

function generateTree():TreeNode {
    const root:TreeNode = {
        parent:none,
        data:{
                checkedState: 'Empty',
                title: 'Foo Bar',
                key: 'root'
        },
        children:[]
    }

    generateSubNode(root,20,3)

    return root
}

ReactDOM.render(
    <App tree={generateTree()}/>,
    document.getElementById("example")
);
