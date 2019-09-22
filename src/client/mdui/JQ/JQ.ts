import JQElement from "./types/JQElement"
import map from './functions/map'
import {isDocument, isElement, isWindow} from "./utils"
import each from "./functions/each"

export class JQ<T = JQElement> implements ArrayLike<T> {
    [n: number]: T
    readonly length: number = 0;

    constructor(arr?:ArrayLike<Node|Window|null|undefined>) {
        if (!arr) {
            return this;
        }

        // 仅保留HTMLElement,HTMLDocument和Window元素
        const elements = map(arr,element=>{
            if (isWindow(element) || isDocument(element)||isElement(element))
                return element
            return null
        })

        each(elements,(i,element)=>{
            // @ts-ignore
            this[i] = element
        })

        this.length = elements.length
        return this
    }

}