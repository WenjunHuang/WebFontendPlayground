import JQElement from "../types/JQElement"
import {GlobalCallback, GlobalSuccessCallback} from "../types/JQAjax"
import {JQ} from '../JQ'
import each from "../functions/each"
import {ajaxEvents} from '../functions/utils/ajax'

declare module '../JQ' {

    interface JQ<T = JQElement>{
        ajaxStart(handler:GlobalCallback):this
    }
}

each(ajaxEvents,(name,eventName) => {
    $.fn[name] = function(this:JQ,fn:GlobalCallback|GlobalSuccessCallback):any {
        return this.on()
    }
})