import each from "./each"

function merge<T,U>(first:T[],second:U[]):Array<T|U> {
    each(second,(_,value)=>{
        first.push(value as any)
    })
    return first
}

export default merge