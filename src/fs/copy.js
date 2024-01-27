import fs from 'fs'
import path from "path"
import {throwError} from "./helpers/throw-error.js"
import {getPaths} from "./helpers/get-paths.js"

const {__dirname} = getPaths(import.meta.url)

const copy = async () => {
    const filesCopyPath = path.join(__dirname, 'files_copy')
    const filesPath = path.join(__dirname, 'files')

    fs.readdir(filesCopyPath, err => {
        if (!err) {
            // already exist
            throwError()
        }
        // folder does not exist
        fs.readdir(filesPath, err => {
            if (err) {
                // folder does not exist
                throwError()
            }
            fs.cp(filesPath, filesCopyPath, { recursive: true }, err => {
                if (err) throwError()
            })
        })
    })
};

copy()
    .then(() => console.log('success'))
    .catch(() => console.error('failed'));
