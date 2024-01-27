import path from "path"
import fs from 'fs'
import {getPaths} from "./helpers/get-paths.js"
import {throwError} from "./helpers/throw-error.js";

const {__dirname} = getPaths(import.meta.url)

const rename = async () => {
    const filePath = path.join(__dirname, 'files', 'wrongFilename.txt')
    const newFilePath = path.join(__dirname, 'files', 'properFilename.md')

    fs.readFile(filePath, err => {
        if (err) {
            // file does not exist
            throwError()
        }
        fs.readFile(newFilePath, err => {
            if (!err) {
                // file already exists
                throwError()
            }
            fs.rename(filePath, newFilePath, err => {
                if (err) throwError()
            })
        })
    })
};

rename()
    .then(() => console.log('success'))
    .catch(() => console.error('failed'));