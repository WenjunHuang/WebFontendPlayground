import {createInterface} from 'readline'
import {log} from 'fp-ts/lib/Console'
import {none, Option, some} from 'fp-ts/lib/Option'
import {randomInt} from 'fp-ts/lib/Random'
import {fromIO, Task, task} from 'fp-ts/lib/Task'

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

const random = fromIO(randomInt(1, 5))
const parse = (s: string): Option<number> => {
    const i = +s
    return isNaN(i) || i % 1 !== 0 ? none : some(i)
}

const checkContinue = (name: string): Task<boolean> =>
    putStrLn(`Do you want to continue, ${name}?`)
        .chain(() => getStrLn)
        .chain(answer => {
            switch (answer.toLowerCase()) {
                case 'y':
                    return task.of(true)
                case 'n':
                    return task.of(false)
                default:
                    return checkContinue(name)
            }
        })

const gameLoop = (name: string): Task<void> =>
    random.chain(secret =>
        putStrLn(`Dear ${name}, please guess a number from 1 to 5`)
            .chain(() =>
                getStrLn.chain(guess => parse(guess).fold(putStrLn('You did not enter an integer!'),
                    x => x === secret ? putStrLn(`You guessed right, ${name}!`)
                        : putStrLn(`You guessed wrong, ${name}! The number was: ${secret}`))
                )
            )
    )
        .chain(() => checkContinue(name))
        .chain(shouldContinue => (shouldContinue ? gameLoop(name) : task.of(undefined)))

const main: Task<void> = putStrLn('What is your name?')
    .chain(() => getStrLn)
    .chain(name => putStrLn(`Hello, ${name} welcome to the game!`).chain(() => gameLoop(name)))

main.run()