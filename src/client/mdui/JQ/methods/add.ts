import $ from '../$'
import JQElement from "../types/JQElement"
import JQSelector from "../types/JQSelector"
import {JQ} from "../JQ"
import unique from "../functions/unique"
import merge from "../functions/merge"

declare module '../JQ' {
    interface JQ<T=JQElement>{
        add(selector:JQSelector):this
    }
}

$.fn.add = function(this:JQ,selector:JQSelector):JQ{
    return new JQ(unique(merge(this.get(),$(selector).get())))
}