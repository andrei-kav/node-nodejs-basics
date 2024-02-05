import {getPaths} from "../helpers/get-paths.js";
import path from "path";
import fs from "fs";

const {__dirname} = getPaths(import.meta.url)

const write = async () => {
    const filePath = path.join(__dirname, 'files', 'fileToWrite.txt')
    const writeStream = fs.createWriteStream(filePath)
    // write process.stdin stream data into the fileToWrite.txt
    process.stdin.pipe(writeStream)
};

await write();