import {Person,jane as tsJane} from './lib'

class JsPerson {

    constructor(first,last){
        this.first = first
        this.last = last
    }

    says = (text) => {
        return `${this.first} says "${text}"`
    }
}

const literalJane = {
    first: 'Jane',
    last: 'Doe',
    get full() {
        return `${this.first} ${this.last}`
    },

    set full(fullName) {
        const parts = fullName.split(' ')
        this.first = parts[0]
        this.last = parts[1]
    },
    says: (text) => {
        return `${this.first} says "${text}"`
    }
}


// const func = jane.says
// try {
//     console.log(func('hello literal'))
// }catch (e){
//     console.log(e)
// }

const func2 = tsJane.says
console.log(func2('hello ts'))

const jsJane = new JsPerson('Jane','Wolf')
const func3 = jsJane.says
console.log(func3('hello js'))
