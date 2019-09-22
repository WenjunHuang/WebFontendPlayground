import JQSelector from "../types/JQSelector"
import {JQ} from '../JQ';

export interface JQStatic {
    // Document 加载完成后执行函数
    (callback:(this:HTMLDocument, $:JQStatic)=>void):JQ<HTMLDocument>;

    (window:Window):JQ<Window>;

    (document:HTMLDocument):JQ<HTMLDocument>;

    (selector?:JQSelector):JQ<HTMLElement>;

    fn:any;

    // $ 命名空间上的静态方法
    [method:string]: Function;
}