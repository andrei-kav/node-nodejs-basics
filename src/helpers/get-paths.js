import path from "path"
import { fileURLToPath } from 'url'

export const getPaths = (url) => {
    const filePath = fileURLToPath(url)
    return {
        __filename: filePath,
        __dirname: path.dirname(filePath)
    }
}