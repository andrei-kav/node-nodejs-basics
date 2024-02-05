import {getPaths} from "../helpers/get-paths.js";
import path from "path";
import fs from "fs";
import zlib from "zlib";

const {__dirname} = getPaths(import.meta.url)

const decompress = async () => {
    const toReadPath = path.join(__dirname, 'files', 'archive.gz')
    const readStream = fs.createReadStream(toReadPath)
    const toWritePath = path.join(__dirname, 'files', 'fileToCompress.txt')
    const writeStream = fs.createWriteStream(toWritePath)
    const unzip = zlib.createUnzip()
    // unzip archive.gz and write content into fileToCompress.txt
    readStream.pipe(unzip).pipe(writeStream)
};

await decompress();