import {JQ} from '../JQ'
import JQElement from "../types/JQElement"
import "./each"
import $ from "../$"
import {isElement} from "../utils"
import each from "../functions/each"


declare module '../JQ' {

    interface JQ<T=JQElement>{
        addClass(className:string):this
    }
}

type classListMethod = 'add'|'remove'|'toggle'

each(['add','remove','toggle'],(_,name:classListMethod)=>{
    $.fn[`${name}Class`] = function(this:JQ,className:string):JQ {
        if (!className)
            return this

        const classes = className.split(' ')
        return this.each((_,element)=>{
            if (!isElement(element))
                return

            each(classes,(_,cls)=>{
                element.classList[name](cls)
            })
        })
    }
})