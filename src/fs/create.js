import fs from 'fs'
import path from "path"
import {throwError} from "./helpers/throw-error.js";
import {getPaths} from "./helpers/get-paths.js";

const {__dirname} = getPaths(import.meta.url)

const create = async () => {
    const filePath = path.join(__dirname, 'files', 'fresh.txt')
    fs.readFile(filePath, err => {
        if (!err) {
            // file already exists
            throwError()
        }
        // file does not exist
        fs.writeFile(filePath, 'I am fresh and young', err => {
            if (err) throwError()
        })
    })
};

await create();