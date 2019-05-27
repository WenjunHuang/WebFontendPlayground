import {log} from 'fp-ts/lib/Console'
import {Type, URIS} from 'fp-ts/lib/HKT'
import {none, Option, some} from 'fp-ts/lib/Option'
import {randomInt} from 'fp-ts/lib/Random'
import {fromIO, task, Task, URI as TaskURI} from 'fp-ts/lib/Task'
import {createInterface} from 'readline'
import {Monad1} from "fp-ts/lib/Monad"

const getStrLn: Task<string> = new Task(() =>
    new Promise(resolve => {
        const r1 = createInterface({
            input: process.stdin,
            output: process.stdout
        })
        r1.question('> ', answer => {
            r1.close()
            resolve(answer)
        })
    })
)

const putStrLn = (message: string): Task<void> => fromIO(log(message))

const parse = (s: string): Option<number> => {
    const i = +s
    return isNaN(i) || i % 1 !== 0 ? none : some(i)
}


// type classes
type _<F extends URIS, A> = Type<F, A> & Monad1<F>

interface ProgramSyntax<F extends URIS, A> {
    map: <B>(f: (a: A) => B) => _<F, B>
    chain: <B>(f: (a: A) => _<F, B>) => _<F, B>
}

interface Program<F extends URIS,A> {
    finish: (a: A) => _<F, A>
}

interface Console<F extends URIS> {
    putStrLn: (message: string) => _<F, void>
    getStrLn: _<F,string>
}

interface Random<F extends URIS> {
    nextInt: (upper: number) => _<F, number>
}

interface Main<F extends URIS,A> extends Program<F,A>,Console<F>,Random<F>{}

// instances
const programTask:Program<TaskURI,any> = {
    finish: task.of
}

const consoleTask: Console<TaskURI> = {
    putStrLn,
    getStrLn
}

const randomTask:Random<TaskURI> = {
    nextInt: upper => fromIO(randomInt(1,upper))
}

// game
const checkContinue = <F extends URIS>(F:Program<F> & Console<F>) => (name:string):_<F,boolean> =>
    F.putStrLn()