import {Functor1, lift} from 'fp-ts/lib/Functor'


export const URI = 'Identity'
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
    interface URI2HKT<A>{
        Identity:Identity<A>
    }
}

export class Identity<A> {
    constructor(readonly value:A){}

    map<B>(f: (a:A)=>B):Identity<B> {
        return new Identity<B>(f(this.value))
    }
}

const map = <A,B>(fa:Identity<A>,f:(a:A)=>B):Identity<B> => fa.map(f)

// Functor instance
export const identity: Functor1<URI> = {
    URI,
    map
}

const double = (n:number):number => n* 2
const doubleIdentity = lift(identity)(double)