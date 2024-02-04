import path from "path"
import { fileURLToPath } from 'url'

export const getPaths = (url) => {
    const filePath = fileURLToPath(url)
    return {
        __filename: filePath,
        __dirname: path.dirname(filePath)
    }
}

export const removeDoubleQuotes = (path) => {
    return path.replace(/"/g, '');
}

export const getPathsFromString = (path) => {
    const paths = []
    let pathCopy = path

    while (pathCopy.length) {
        let trimmed = pathCopy.trim();
        if (trimmed.startsWith('"')) {
            const resolved = /"([^"]+(?="))"/g.exec(trimmed)
            if (resolved) {
                paths.push(resolved[1])
                pathCopy = trimmed.slice(resolved[0].length)
            } else {
                const item = trimmed.split(' ')[0]
                paths.push(item)
                pathCopy = trimmed.slice(item.length)
            }
        } else {
            const item = trimmed.split(' ')[0]
            paths.push(item)
            pathCopy = trimmed.slice(item.length)
        }
    }

    return paths
}