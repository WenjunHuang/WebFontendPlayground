let subscribers: (() => void)[] = []
export const set = (key: string, value: string) => {
    console.log(value)
    localStorage.setItem(key, value)
    subscribers.forEach(s => s())
}

export const subscribe = (fn: () => void) => {
    subscribers.push(fn)
    const unsubscribe = () => {
        subscribers = subscribers.filter(s => s !== fn)
    }
    return unsubscribe
}

export const get = (key: string) => {
    return localStorage.getItem(key)
}