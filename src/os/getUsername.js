import {userInfo} from "os";
import {pipeline} from "stream/promises";
import {Readable} from "stream";
export const getUsername = async () => {
    const readable = new Readable()
    readable.push(`${userInfo().username || 'unknown user'}\n`)
    readable.push(null)
    await pipeline(readable, process.stdout)
}