import fs from 'fs/promises'
import path from "path"

export const create = async (workingDir, fileName) => {
    const filePath = path.join(workingDir, fileName)
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