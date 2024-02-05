import {getPaths, getPathsFromString} from "../helpers/get-paths.js";
import path from "path";

export const isZIPCommand = (chunk) => {
    const command = chunk.split(' ')[0]
    const args = chunk.slice(command.length).trim();

    switch (command) {
        case 'compress':
        case 'decompress':
            return getPathsFromString(args).length === 2
    }
}

export const zipHandlerPath = () => {
    const {__dirname} = getPaths(import.meta.url)
    return path.join(__dirname, 'zip-handler.js')
}