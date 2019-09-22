import {isUndefined} from "../utils"

function contains(
    parent:HTMLElement|HTMLDocument,
    child:HTMLElement|HTMLDocument,
):boolean;

function contains(
    child:HTMLElement|HTMLDocument
):boolean

function contains(parent:HTMLElement|HTMLDocument,
                  child?:HTMLElement|HTMLDocument):boolean {
    if (isUndefined(child)) {
        return document.documentElement.contains(parent)
    }

    return parent !== child && parent.contains(child)
}

export default contains