import JQElement from "../types/JQElement"
import {JQ} from "../JQ"
import {GlobalCallback} from "../types/JQAjax"

declare module '../JQ' {


    interface JQ<T=JQElement>{
        ajaxError(handler:GlobalCallback):this

    }
}