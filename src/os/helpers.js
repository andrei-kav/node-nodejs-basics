import {getPaths} from "../helpers/get-paths.js";
import path from "path";

export const isOSCommand = (command) => {
    return [
        'os --EOL',
        'os --cpus',
        'os --homedir',
        'os --username',
        'os --architecture'
    ].includes(command)
}

export const osHandlerPath = () => {
    const {__dirname} = getPaths(import.meta.url)
    return path.join(__dirname, 'os-handler.js')
}
