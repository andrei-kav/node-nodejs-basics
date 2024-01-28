import {getPaths} from "../helpers/get-paths.js";
import path from "path";
import fs from "fs";
import {throwError} from "../helpers/throw-error.js";

const {__dirname} = getPaths(import.meta.url)

const remove = async () => {
    const filePath = path.join(__dirname, 'files', 'fileToRemove.txt')
    fs.readFile(filePath, err => {
        if (err) {
            // file already removed
            throwError()
        }
        fs.rm(filePath, err => {
            if (err) throwError()
        })
    })
};

await remove();