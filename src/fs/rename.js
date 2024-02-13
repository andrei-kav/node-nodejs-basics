import path from "path"
import fs from 'fs/promises'
import {getPathsFromString} from "../helpers/get-paths.js"

export const rename = async (workingDir, args) => {
    const paths = getPathsFromString(args)

    let filePath = paths[0]
    let newFileName = paths[1]
    if (!path.isAbsolute(filePath)) {
        filePath = path.join(workingDir, filePath)
    }

    const newFilePath = path.join(path.parse(filePath).dir, newFileName)

    await fs.readFile(filePath)
    try {
        await fs.readFile(newFilePath)
        // throw error if file already exists
        throw new Error('file already exists')
    } catch (error) {
        if (error.message === 'file already exists') {
            throw error
        }
    }

    await fs.rename(filePath, newFilePath)
};