import {getPaths} from "../helpers/get-paths.js";
import path from "path";
import fs from "fs";
import {throwError} from "../helpers/throw-error.js";

const {__dirname} = getPaths(import.meta.url)

const read = async () => {
    const filePath = path.join(__dirname, 'files', 'fileToRead.txt')
    fs.readFile(filePath, {encoding: 'utf8'}, (err, data) => {
        if (err) {
            throwError()
        }
        console.log(data)
    })
};

await read()