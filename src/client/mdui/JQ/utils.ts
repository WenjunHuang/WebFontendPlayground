export function isNodeName(element: HTMLElement, name: string): boolean {
    return element.nodeName.toLowerCase() === name.toLowerCase()
}

export function isArrayLike(target: any): target is ArrayLike<any> {
    return typeof target.length === 'number';
}

export function isObjectLike(target: any): target is Record<string, any> {
    return typeof target === 'object' && target !== null;
}

export function isFunction(target: any): target is Function {
    return typeof target === 'function'
}

export function isString(target: any): target is string {
    return typeof target === 'string'
}

export function isUndefined(target: any): target is undefined {
    return typeof target === 'undefined'
}

export function isNull(target: any): target is null {
    return target === null
}

export function isWindow(target: any): target is Window {
    return target instanceof Window
}

export function isDocument(target: any): target is HTMLDocument {
    return target instanceof  HTMLDocument
}

export function isElement(target: any): target is HTMLElement {
    return target instanceof  HTMLElement
}
