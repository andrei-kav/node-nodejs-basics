import {getPaths} from "../helpers/get-paths.js";
import path from "path";
import fs from "fs";

const {__dirname} = getPaths(import.meta.url)

const read = async () => {
    const filePath = path.join(__dirname, 'files', 'fileToRead.txt')
    const readStream = fs.createReadStream(filePath)
    // write readStream data into process.stdout
    readStream.pipe(process.stdout)
};

await read();