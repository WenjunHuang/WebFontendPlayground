import {Monad1} from 'fp-ts/lib/Monad'
import {Type,URIS} from 'fp-ts/lib/HKT'
import * as D from 'fp-ts/lib/Date'
import {IO} from "fp-ts/lib/IO"
import {identity, tuple} from "fp-ts/lib/function"
import {URI as IOURI,io} from 'fp-ts/lib/IO'
import {URI as TaskURI, task, fromIO} from 'fp-ts/lib/Task'

export interface MonadIO<M extends URIS> extends Monad1<M>{
    readonly fromIO: <A>(fa:IO<A>) => Type<M,A>
}

export function time<M extends URIS>(M:MonadIO<M>): <A>(ma:Type<M,A>)=>Type<M,[A,number]> {
    const now = M.fromIO(D.now)
    return ma => M.chain(now,start => M.chain(ma,a => M.map(now, end=>tuple(a,end-start))))
}

export const monadIOIO:MonadIO<IOURI> = {
    ...io,
    fromIO:identity
}

export const monadIOTask:MonadIO<TaskURI> = {
    ...task,
    fromIO:fromIO
}