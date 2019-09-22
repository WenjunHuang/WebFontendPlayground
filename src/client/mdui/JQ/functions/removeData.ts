import JQElement from "../types/JQElement"
import kDataNS from "./utils/data"
import {isUndefined} from "../utils"

function removeData(element:JQElement,name?:string) {
    if (!element[kDataNS])
        return

    if (isUndefined(name)) {
        element[kDataNS] = null
        delete element[kDataNS]
    } else if (element[kDataNS][name]) {
        element[kDataNS][name] = null
        delete element[kDataNS][name]
    }
}

export default removeData