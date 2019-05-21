export class Person {

    constructor(private first: string, private last: string) {
    }

    get full() {
        return `${this.first} ${this.last}`
    }

    set full(fullName) {
        const parts = fullName.split(' ')
        this.first = parts[0]
        this.last = parts[1]
    }

    says = (text: string): string => {
        return `${this.first} says "${text}"`
    }
}

export const jane = new Person('Jane','Martin')