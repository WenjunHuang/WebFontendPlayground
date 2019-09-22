import JQElement from "../types/JQElement"
import JQSelector from "../types/JQSelector"
import {JQ} from "../JQ"

declare module '../JQ' {


    interface JQ<T = JQElement> {
        insertAfter(selector:JQSelector):this

    }
}