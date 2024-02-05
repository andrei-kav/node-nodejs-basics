import { EOL } from "os";
import {pipeline} from "stream/promises";
import {Readable} from "stream";
export const getEol = async () => {
    const readable = new Readable()
    readable.push(`${JSON.stringify(EOL)}\n`)
    readable.push(null)
    await pipeline(readable, process.stdout)
}