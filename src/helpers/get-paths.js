import path from "path"
import { fileURLToPath } from 'url'

export const getPaths = (url) => {
    const filePath = fileURLToPath(url)
    return {
        __filename: filePath,
        __dirname: path.dirname(filePath)
    }
}

export const getPathsFromString = (paths) => {
    const resolvedPaths = []
    let pathsCopy = paths

    while (pathsCopy && pathsCopy.length) {
        let trimmed = pathsCopy.trim();
        if (trimmed.startsWith('"')) {
            const resolved = /"([^"]+(?="))"/g.exec(trimmed)
            if (resolved) {
                resolvedPaths.push(resolved[1])
                pathsCopy = trimmed.slice(resolved[0].length)
            } else {
                const item = trimmed.split(' ')[0]
                resolvedPaths.push(item)
                pathsCopy = trimmed.slice(item.length)
            }
        } else {
            const item = trimmed.split(' ')[0]
            resolvedPaths.push(item)
            pathsCopy = trimmed.slice(item.length)
        }
    }

    return resolvedPaths
}