import path from "path"
import fs from "fs"
import {pipeline} from "stream/promises"

export const read = async (workingDir, file) => {
    let pathToFile = file
    if (!path.isAbsolute(file)) {
        pathToFile = path.join(workingDir, file)
    }
    await pipeline(fs.createReadStream(pathToFile), process.stdout)
};