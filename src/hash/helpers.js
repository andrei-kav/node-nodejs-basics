import {getPaths, getPathsFromString} from "../helpers/get-paths.js";
import path from "path";

export const isHashCommand = (chunk) => {
    const command = chunk.split(' ')[0]
    const args = chunk.slice(command.length).trim();

    return command === 'hash' && getPathsFromString(args).length === 1
}

export const hashHandlerPath = () => {
    const {__dirname} = getPaths(import.meta.url)
    return path.join(__dirname, 'hash-handler.js')
}