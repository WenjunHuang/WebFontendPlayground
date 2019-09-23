import {app, BrowserWindow, ipcMain} from 'electron'
import * as path from 'path'
import * as url from 'url'

let win: BrowserWindow | null

const installExtensions = async () => {

}

const createWindow = async () => {
    if (process.env.NODE_ENV !== 'production')
        await installExtensions()

    win = new BrowserWindow({
        width: 800, height: 600, webPreferences: {
            nodeIntegration: true
        }
    })

    if (process.env.NODE_ENV !== 'production') {
        process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1'
        await win.loadURL(`http://localhost:2003`)
    } else {
        await win.loadURL(
            url.format({
                pathname: path.join(__dirname, 'index.html'),
                protocol: 'file',
                slashes: true
            })
        )
    }

    if (process.env.NODE_ENV !== 'production') {
        win.webContents.once('dom-ready', () => {
            win!.webContents.openDevTools()
        })
    }

    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit()
})
app.on('activate', async () => {
    if (win === null)
        await createWindow()
})

ipcMain.on('asynchronous-message', (event, arg) => {
    console.log(arg)
    event.reply('asynchronous-reply', `hello, ${arg}`)
})
ipcMain.on('synchronous-message',(event,arg)=>{
    console.log(arg)
    event.returnValue = `hello, ${arg}`
})