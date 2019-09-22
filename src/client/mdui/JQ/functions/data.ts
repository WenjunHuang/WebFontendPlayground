import JQElement from "../types/JQElement"
import PlainObject from "../interfaces/PlainObject"
import kDataNS from "./utils/data"
import each from "./each"
import {JQ} from "../JQ"
import {isElement, isObjectLike, isUndefined} from "../utils"

function setObjToElement(element: JQElement,
                         obj: PlainObject) {
    if (!element[kDataNS]) {
        element[kDataNS] = {}
    }

    each(obj, (key, value) => {
        element[kDataNS][key] = value
    })
}

function data<T>(element:JQElement,key:string,value:T):T
function data<T extends PlainObject>(element:JQElement,data:T):T
function data(element:JQElement,key:string):any
function data(element:JQElement):PlainObject

function data(element:JQElement,
              key?:string|PlainObject,
              value?:any,):any {
    if (isObjectLike(key)) {
        setObjToElement(element, key)
        return key
    }

    if (!isUndefined(value)) {
        setObjToElement(element,{key:value})
        return value
    }

    if (isUndefined(key)) {
        const result: PlainObject = {}
        if (isElement(element)) {
            each(element.attributes,(_,attribute)=>{
                const {name} = attribute
                if (name.indexOf('data-') === 0) {
                    const prop = name.slice(5)
                        .replace(/-./g,u=>u.charAt(1).toUpperCase())

                }
            })
        }

        if (element[kDataNS]) {
            each(element[kDataNS],(key:string,value)=>{
                result[key] = value
            })
        }
        return result
    }

    if (element[kDataNS] && key in element[kDataNS])
        return element[kDataNS][key]

    if (isElement(element)) {
        const dataKey = element.getAttribute(`data-${key}`)
        if (dataKey)
            return dataKey
    }

    return undefined
}

export default data