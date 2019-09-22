import {JQ} from '../JQ'
import JQElement from "../types/JQElement"
import $ from '../$'

declare module '../JQ' {

    interface JQ<T = JQElement> {
        get(index: number): T

        get(): T[]
    }
}

$.fn.get = function (this: JQ, index?: number): JQElement | JQElement[] {
    return index === undefined
        ? [].slice.call(this)
        : this[index >= 0 ? index : index + this.length]
}