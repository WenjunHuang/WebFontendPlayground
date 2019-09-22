import PlainObject from "../interfaces/PlainObject"
import each from "./each"
import {isNull, isUndefined} from "../utils"

function map<T, TReturn>(
    array: ArrayLike<T>,
    callback: (this: Window, value: T, index: number,) => TReturn | TReturn[] | null | undefined,
): TReturn[]

function map<T extends PlainObject,K extends keyof T,TReturn>(
    obj:T,
    callback:(this:Window,value:T[K],key:K,)=>TReturn|TReturn[]|null|undefined,
):TReturn[]

function map(elements:any,callback:Function):any {
    const ret:any[] = []

    each(elements,(i,element)=>{
        const value = callback.call(window,element,i)

        if (!isNull(value) && !isUndefined(value)) {
            ret.push(value)
        }
    })
    return ret
}

export default map