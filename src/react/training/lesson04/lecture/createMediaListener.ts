export default (media: {
    [key: string]: string
}) => {
    type Indexable<T> = { [key: string]: T };
    type Listener = (event: Indexable<boolean>) => void

    let listeners: Listener[] = []

    const mediaKeys = Object.keys(media)
    const queryLists = mediaKeys.reduce((queryLists, key) => {
        queryLists[key] = window.matchMedia(media[key])
        return queryLists
    }, <Indexable<MediaQueryList>>{})


    const mediaState = mediaKeys.reduce((state, key) => {
        state[key] = queryLists[key].matches
        return state
    }, <Indexable<boolean>>{})

    const notify = () => {
        listeners.forEach(listener =>
            listener(mediaState)
        )
    }

    const mutateMediaState = (key: string, val: boolean) => {
        mediaState[key] = val
        notify()
    }


    mediaKeys.forEach(key => {
        queryLists[key].addEventListener("change", (ev) => {
            mutateMediaState(key, ev.matches)
        })
    })

    const addListener = (listener: Listener) => {
        listeners = [...listeners, listener]
        return () => {
            listeners = listeners.filter(l => l != listener)
        }
    }

    const getState = () => mediaState

    return {addListener,getState}
}