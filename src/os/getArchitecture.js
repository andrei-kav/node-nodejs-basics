import {pipeline} from "stream/promises";
import {Readable} from "stream";
export const getArchitecture = async () => {
    const readable = new Readable()
    readable.push(`${process.arch}\n`)
    readable.push(null)
    await pipeline(readable, process.stdout)
}