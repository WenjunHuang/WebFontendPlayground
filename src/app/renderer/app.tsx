import * as React from 'react'
import * as ReactDOM from "react-dom"
import {remote, ipcRenderer} from 'electron'
import {useState} from "react"


const mainElement = document.createElement('div')
document.body.appendChild(mainElement)

// const render = (Component:()=>JSX.Element) =>{
//     render(
//         <div>Hello Electron</div>,
//         mainElement
//     )
// }

const App = () => {
    const [messages, setMessages] = useState<string[]>([])
    return (
        <div>
            <ul>
                {
                    messages.map((value) => {
                        return <li>{value}</li>
                    })
                }
            </ul>
            <button onClick={() => {
                ipcRenderer.once('asynchronous-reply', (event, log) => {
                    setMessages([log, ...messages])
                })
                ipcRenderer.send('asynchronous-message', 'ping')

            }}>Send asyn message to main
            </button>
            <button onClick={() => {
                console.log(ipcRenderer.sendSync('synchronous-message', 'wenjun'))
            }
            }>Send sync message to main
            </button>
        </div>
    )
}

ReactDOM.render(<App/>,
    mainElement
)

