import {getPaths} from "./helpers/get-paths.js";
import path from "path";
import fs from "fs";
import {throwError} from "./helpers/throw-error.js";

const {__dirname} = getPaths(import.meta.url)

const list = async () => {
    const dirPath = path.join(__dirname, 'files')

    fs.readdir(dirPath, (err, files) => {
        if (err) {
            throwError()
        }
        console.log(files)
    })
};

await list();