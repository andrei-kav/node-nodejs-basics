import {homedir} from "os";
import {pipeline} from "stream/promises";
import {Readable} from "stream";
export const getHomedir = async () => {
    const readable = new Readable()
    readable.push(`${homedir()}\n`)
    readable.push(null)
    await pipeline(readable, process.stdout)
}