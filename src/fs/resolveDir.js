import path from 'path'
import fs from "fs/promises";
import {getPathsFromString} from "../helpers/get-paths.js";
export const resolveDir = async (current, to) => {
    let updated = getPathsFromString(to)[0]
    if (!path.isAbsolute(updated)) {
        updated = path.join(current, updated)
    }
    // just to check if the updated directory exists
    await fs.readdir(updated)
    return updated
}