import PlainObject from "../interfaces/PlainObject"
import each from "./each"
import {isUndefined} from "../utils"

function extend(
    target:PlainObject,
    object1:PlainObject,
    ...objectN:PlainObject[]
):PlainObject {
    objectN.unshift(object1)
    each(objectN,(_,object)=>{
        each(object,(prop,value)=>{
            if (!isUndefined(value))
                target[prop] = value
        })
    })

    return target
}

export default extend