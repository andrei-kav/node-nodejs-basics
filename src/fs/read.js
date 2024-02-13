import path from "path"
import fs from "fs"
import {pipeline} from "stream/promises"
import {Transform} from "stream"
import {getPathsFromString} from "../helpers/get-paths.js"

export const read = async (workingDir, file) => {
    let pathToFile = getPathsFromString(file)[0]
    if (!path.isAbsolute(pathToFile)) {
        pathToFile = path.join(workingDir, pathToFile)
    }
    
    const addLineBreak = new Transform({
        transform(chunk, encoding, callback) {
            this.push(`${chunk}\n`)
            callback()
        }
    })
    
    await pipeline(fs.createReadStream(pathToFile), addLineBreak, process.stdout)
};
