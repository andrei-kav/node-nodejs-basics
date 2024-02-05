import {getPaths, getPathsFromString} from "../helpers/get-paths.js";
import path from "path";

export const isFSCommand = (chunk) => {
    const command = chunk.split(' ')[0]
    const args = chunk.slice(command.length).trim();

    switch (command) {
        case 'ls':
        case 'up':
            return !args
        case 'rm':
        case 'cd':
        case 'cat':
        case 'add':
            return getPathsFromString(args).length === 1
        case 'rn':
        case 'cp':
        case 'mv':
            return getPathsFromString(args).length === 2
    }
}

export const fsHandlerPath = () => {
    const {__dirname} = getPaths(import.meta.url)
    return path.join(__dirname, 'fs-handler.js')
}
