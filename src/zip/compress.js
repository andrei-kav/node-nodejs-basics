import {getPaths} from "../helpers/get-paths.js";
import path from "path";
import fs from "fs";
import zlib from "zlib";

const {__dirname} = getPaths(import.meta.url)

const compress = async () => {
    const toReadPath = path.join(__dirname, 'files', 'fileToCompress.txt')
    const readStream = fs.createReadStream(toReadPath)
    const toWritePath = path.join(__dirname, 'files', 'archive.gz')
    const writeStream = fs.createWriteStream(toWritePath)
    const gzip = zlib.createGzip()
    // compress the txt file and write it into archive.gz
    readStream.pipe(gzip).pipe(writeStream)
};

await compress();