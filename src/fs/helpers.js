import {getPaths} from "../helpers/get-paths.js";
import path from "path";

export const isFSCommand = (command) => {
    return ['up', 'cd', 'ls', 'cat', 'add', 'rn', 'cp', 'mv', 'rm'].includes(command)
}

export const fsHandlerPath = () => {
    const {__dirname} = getPaths(import.meta.url)
    return path.join(__dirname, 'fs-handler.js')
}