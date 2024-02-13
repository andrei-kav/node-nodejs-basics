import {getPathsFromString} from "../helpers/get-paths.js";
import path from "path";
import fs from "fs";
import zlib from "zlib";
import fsPromises from "fs/promises";
import {pipeline} from "stream/promises";

export const decompress = async (workingDir, args) => {
    const paths = getPathsFromString(args)

    let filePath = paths[0]
    if (!path.isAbsolute(filePath)) {
        filePath = path.join(workingDir, filePath)
    }

    let pathToNewDir = paths[1]
    if (!path.isAbsolute(pathToNewDir)) {
        pathToNewDir = path.join(workingDir, pathToNewDir)
    }

    const fileInfo = path.parse(filePath)
    if (fileInfo.ext !== '.br') {
        throw new Error('wrong file')
    }
    const fileName = fileInfo.name
    const newFilePath = path.join(pathToNewDir, fileName)

    // do some checks
    // whether the file exists
    // whether the new directory exists
    // and there is no file with the same name
    await fsPromises.readFile(filePath)
    await fsPromises.readdir(pathToNewDir)
    try {
        await fsPromises.readFile(newFilePath)
        // throw error if file already exists
        throw new Error('file already exists')
    } catch (error) {
        if (error.message === 'file already exists') {
            throw error
        }
    }

    const brotli = zlib.createBrotliDecompress();

    await pipeline(fs.createReadStream(filePath), brotli, fs.createWriteStream(newFilePath))
}