import path from 'path'
import fs from "fs/promises";
import {removeDoubleQuotes} from "../helpers/get-paths.js";
export const resolveDir = async (current, to) => {
    let updated = removeDoubleQuotes(to)
    if (!path.isAbsolute(updated)) {
        updated = path.join(current, updated)
    }
    // just to check if the updated directory exists
    await fs.readdir(updated)
    return updated
}