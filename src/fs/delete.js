import path from "path"
import fsPromises from "fs/promises"
import {getPathsFromString} from "../helpers/get-paths.js";

export const remove = async (workingDir, pathToFile) => {
    let filePath = getPathsFromString(pathToFile)[0]
    if (!path.isAbsolute(filePath)) {
        filePath = path.join(workingDir, filePath)
    }
    await fsPromises.rm(filePath)
};
