import JQElement from "../types/JQElement"
import {JQ} from "../JQ"
import each from "../functions/each"
import $ from "../$"

declare module '../JQ' {

    interface JQ<T = JQElement> {
        each(callback:(this:T,index:number,element:T)=>any):this
    }
}

$.fn.each = function(this:JQ,callback:any):JQ{
    return each(this,callback) as JQ

}