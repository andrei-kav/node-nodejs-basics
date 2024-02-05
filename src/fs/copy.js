import fs from 'fs'
import fsPromises from 'fs/promises'
import path from "path"
import {pipeline} from "stream/promises"
import {getPathsFromString} from "../helpers/get-paths.js"

export const copy = async (workingDir, args) => {
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
    const fileName = fileInfo.name + fileInfo.ext
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
        // console.log(error)
        // console.log('error.message', error.message)
        if (error.message === 'file already exists') {
            throw error
        }
    }
    
    // const readable = fs.createReadStream(filePath)
    // const writeable = fs.createWriteStream(newFilePath)
    await pipeline(fs.createReadStream(filePath), fs.createWriteStream(newFilePath))
};
