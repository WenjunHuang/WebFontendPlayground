import PlainObject from "../interfaces/PlainObject"
import {isArrayLike} from "../utils"

function each<T>(array:ArrayLike<T>,
                        callback:(this:T,index:number,value:T)=>any|false):ArrayLike<T>;

function each<T extends PlainObject,K extends keyof T>(obj:T,
                                                       callback:(this:T[K],key:K,value:T[K])=>any|false):T;

function each(target:ArrayLike<any>|PlainObject,callback:Function):any {
    if (isArrayLike(target)) {
        for (let i = 0;i <target.length;i++) {
            if (callback.call(target[i],i,target[i]) === false) {
                return target;
            }
        }
    } else {
        const keys = Object.keys(target)
        for (let i = 0;i<keys.length;i++) {
            if (callback.call(target[keys[i]],keys[i],target[keys[i]]) === false)
                return target
        }
    }
    return target
}

export default each;