import {createHash} from 'crypto'
import fs from 'fs'
import {getPathsFromString} from "../helpers/get-paths.js";
import path from "path";
import {pipeline} from "stream/promises";

export const calculateHash = async (workingDir, pathToFile) => {
    let filePath = getPathsFromString(pathToFile)[0]
    if (!path.isAbsolute(filePath)) {
        filePath = path.join(workingDir, filePath)
    }

    const readStream = fs.createReadStream(filePath)

    const hash = createHash('sha256')
    hash.setEncoding('hex')
    hash.on('finish', () => console.log(hash.read()))

    await pipeline(readStream, hash)
};