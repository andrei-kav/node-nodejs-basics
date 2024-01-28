import {createHash} from 'crypto'
import fs from 'fs'
import {getPaths} from "../helpers/get-paths.js";
import path from "path";

const {__dirname} = getPaths(import.meta.url)

const calculateHash = async () => {
    const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt')
    const readStream= fs.createReadStream(filePath)
    readStream.on('data', (data) => {
        // creating sha256 hash of the content and transform it hex string
        const hash = createHash('sha256').update(data).digest('hex')
        console.log(hash)
    })
};

await calculateHash();