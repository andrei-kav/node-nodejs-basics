import fs from 'fs/promises'
import path from "path"
import {getPathsFromString} from "../helpers/get-paths.js";

export const create = async (workingDir, fileName) => {
    const filePath = path.join(workingDir, getPathsFromString(fileName)[0])
    try {
        await fs.readFile(filePath)
        // throw error if file already exists
        throw new Error('file already exists')
    } catch (error) {
        if (error.message === 'file already exists') {
            throw error
        }
        await fs.writeFile(filePath, '')
    }
};