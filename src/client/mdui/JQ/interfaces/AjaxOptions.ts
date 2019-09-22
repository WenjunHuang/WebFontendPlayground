import PlainObject from "./PlainObject"
import {
    BeforeSendCallback,
    CompleteCallback, ErrorCallback, StatusCodeCallbacks, SuccessCallback, XHRFields,
} from '../types/JQAjax'

export default interface AjaxOptions {
    url?:string;
    method?:string;
    data?:any
    processData?:boolean
    async?:boolean
    cache?:boolean
    username?:string
    password?:string
    headers?:PlainObject<string|null|undefined>;
    xhrFields?:XHRFields
    statusCode?:StatusCodeCallbacks
    dataType?:'text'|'json'|'jsonp'
    jsonp?:string
    jsonpCallback?:string|Function
    contentType?:string|false
    timeout?:number
    global?:boolean
    beforeSend?:BeforeSendCallback
    success?:SuccessCallback
    error?:ErrorCallback
    complete?:CompleteCallback
}