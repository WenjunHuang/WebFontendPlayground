import * as React from "react";
import * as ReactDOM from "react-dom";
import {App, CheckState, TreeNode,AppClass} from "./App";
import {none, some} from "fp-ts/lib/Option"

function fetchSchools(){
    const url = "http://192.168.2.122:9091/permission/template/school_tree/2fe2e5b9-5f6d-487f-bfa1-36803b501a93"
}
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
    <AppClass tree={generateTree()}/>,
    document.getElementById("example")
);
