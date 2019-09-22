import JQElement from "../types/JQElement"
import JQSelector from "../types/JQSelector"
import {JQ} from "../JQ"
import $ from "../$"
import './insertAfter'

declare module '../JQ' {
    interface JQ<T = JQElement> {
        after(selector: JQSelector): this

    }
}

$.fn.after = function (this: JQ, selector: JQSelector): JQ {
    $(selector).insertAfter(this)
    return this
}