import each from './each'

function unique(arr:any[]):any[] {
    const result: any[] = []

    each(arr,(i,val)=>{
        if (result.indexOf(val) === -1)
            result.push(val)
    })
    return result
}

export default unique