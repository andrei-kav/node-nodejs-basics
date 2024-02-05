import path from "path"
import fs from "fs"
import {pipeline} from "stream/promises"
import {getPathsFromString} from "../helpers/get-paths.js";

export const read = async (workingDir, file) => {
    let pathToFile = getPathsFromString(file)[0]
    if (!path.isAbsolute(file)) {
        pathToFile = path.join(workingDir, file)
    }
    await pipeline(fs.createReadStream(pathToFile), process.stdout)
};