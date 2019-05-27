import {log} from 'fp-ts/lib/Console'
import {Type, URIS} from 'fp-ts/lib/HKT'
import {none, Option, some} from 'fp-ts/lib/Option'
import {randomInt} from 'fp-ts/lib/Random'
import {fromIO, task, Task, URI as TaskURI} from 'fp-ts/lib/Task'
import {createInterface} from 'readline'

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
type _<F extends URIS, A> = Type<F, A> & ProgramSyntax<F, A>

interface ProgramSyntax<F extends URIS, A> {
    map: <B>(f: (a: A) => B) => _<F, B>
    chain: <B>(f: (a: A) => _<F, B>) => _<F, B>
}

interface Program<F extends URIS, A> {
    finish: (a: A) => _<F, A>
}

interface Console<F extends URIS> {
    putStrLn: (message: string) => _<F, void>
    getStrLn: _<F, string>
}

interface Random<F extends URIS> {
    nextInt: (upper: number) => _<F, number>
}

interface Main<F extends URIS, A> extends Program<F, A>, Console<F>, Random<F> {
}

// instances
const programTask: Program<TaskURI, any> = {
    finish: task.of
}

const consoleTask: Console<TaskURI> = {
    putStrLn,
    getStrLn
}

const randomTask: Random<TaskURI> = {
    nextInt: upper => fromIO(randomInt(1, upper))
}

// game
const checkContinue = <F extends URIS>(F: Program<F, any> & Console<F>) => (name: string): _<F, boolean> =>
    F.putStrLn(`Do you want to continue, ${name}?`)
        .chain(() => F.getStrLn)
        .chain(answer => {
            switch (answer.toLowerCase()) {
                case 'y':
                    return F.finish(true)
                case 'n':
                    return F.finish(false)
                default:
                    return checkContinue(F)(name)
            }
        })

const gameLoop = <F extends URIS>(F: Main<F, void>) => (name: string): _<F, void> =>
    F.nextInt(5).chain(secret =>
        F.putStrLn(`Dear ${name}, please guess a number from 1 to 5`)
            .chain(() =>
                F.getStrLn.chain(guess =>
                    parse(guess).fold(
                        F.putStrLn('You did not enter an integer!'),
                        x =>
                            x === secret
                                ? F.putStrLn(`You guessed right, ${name}!`)
                                : F.putStrLn(`You guessed wrong, ${name}! The number was: ${secret}`)
                    )
                )
            )
            .chain(() => checkContinue(F)(name))
            .chain(shouldContinue => (shouldContinue ? gameLoop(F)(name) : F.finish(undefined)))
    )

const main = <F extends URIS>(F: Main<F, void>): _<F, void> => {
    return F.putStrLn('What is your name?')
        .chain(() => F.getStrLn)
        .chain(name => F.putStrLn(`Hello, ${name} welcome to the game!`)
            .chain(() => gameLoop(F)(name))
        )
}

const mainTask = main({...programTask, ...consoleTask, ...randomTask})
mainTask.run()