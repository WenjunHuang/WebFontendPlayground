import {JQ} from '../JQ'
import PlainObject from "../interfaces/PlainObject"
import JQElement from "../types/JQElement"
import './each'
import './off'
import $ from "../$"
import {isObjectLike} from "../utils"
import each from "../functions/each"

type EventCallback = (e: Event, data?: any) => void | false

declare module '../JQ' {
    interface JQ<T = JQElement> {
        on(events:PlainObject<EventCallback>,selector:string,data?:any):this

        on(events:PlainObject<EventCallback>,data?:any):this

        on(eventName:string,
           selector:string,
           data:any,
           callback:EventCallback):this

        on(eventName:string,
           selector:string,
           callback:EventCallback):this

        on(eventName:string,
           data:any,
           callback:EventCallback):this

        on(eventName:string,
           callback:EventCallback):this
    }
}

$.fn.on = function(
    this:JQ,
    eventName:PlainObject<EventCallback> | string,
    selector:any,
    data?:any,
    callback?:any,
    one?:boolean, // 是否是one方法，只在JQ内部使用
):JQ {
    if (isObjectLike(eventName)) {
        each(eventName,(type:string,fn:EventCallback)=>{
            this.on(type,selector,data,fn,one)
        })
        return thi








































































        +

            +-
                +7
        
    }

}