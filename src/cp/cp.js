import {fork} from 'child_process'
import {getPaths} from "../helpers/get-paths.js"
import path from "path"

const {__dirname} = getPaths(import.meta.url)

const spawnChildProcess = async (args) => {
    const childPath = path.join(__dirname, 'files', 'script.js')

    const child = fork(childPath, args, { stdio: ['inherit', 'pipe', 'inherit', 'ipc'] })

    child.stdout.on('data', (message) => {
        console.log('got from child\n', message.toString())
    })
};

// Put your arguments in function call to test this functionality
await spawnChildProcess(['a', 'b']);
