import PlainObject from "../interfaces/PlainObject"
import {isObjectLike} from "../utils"
import each from "./each"


function param(obj: any[] | PlainObject): string {
    if (!isObjectLike(obj)) {
        return ''
    }

    const args: any[] = []

    function destructure(key: any, value: any) {
        let keyTmp

        if (isObjectLike(value)) {
            each(value, (i, v) => {
                if (Array.isArray(value) && !isObjectLike(v)) {
                    keyTmp = ''
                } else {
                    keyTmp = i
                }
                destructure(`${key}[${keyTmp}]`, v)
            })
        } else {
            if (value !== null && value !== '') {
                keyTmp = `=${encodeURIComponent(value)}`
            } else {
                keyTmp = ''
            }
            args.push(encodeURIComponent(key) + keyTmp)
        }
    }

    each(obj, destructure)
    return args.join('&')
}

export default param