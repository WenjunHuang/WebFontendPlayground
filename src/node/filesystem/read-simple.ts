import * as fs from 'fs'
import * as util from 'util'

fs.readFile('target.txt', (err, data) => {
    if (err)
        throw err
    console.log(data.toString())
})

// async / await
const readFile = util.promisify(fs.readFile)

readFile('target.txt')
    .then(data => {
        console.log(data.toString())
    })
    .catch(err => {
        throw err
    })

