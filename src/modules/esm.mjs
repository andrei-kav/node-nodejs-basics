import path from "path";
import {release, version} from 'os';
import { createServer as createServerHttp } from 'http';
import {getPaths} from "../fs/helpers/get-paths.js";
import './files/c.js'
import aJson from "./files/a.json" assert { type: "json" };
import bJson from "./files/b.json" assert { type: "json" };

const {__dirname, __filename} = getPaths(import.meta.url)

const random = Math.random();

let unknownObject;

if (random > 0.5) {
    unknownObject = aJson;
} else {
    unknownObject = bJson;
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

export {
    myServer, unknownObject
}

// module.exports = {
//     unknownObject,
//     myServer,
// };

