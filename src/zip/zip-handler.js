import {parentPort, workerData} from 'worker_threads'
import {compress} from "./compress.js";
import {decompress} from "./decompress.js";

const sendResult = async () => {
    try {
        let {workDir, operation} = workerData
        const stringified = operation.toString();
        const command = stringified.split(' ')[0]
        const args = stringified.slice(command.length).trim();

        switch (command) {
            case 'compress':
                await compress(workDir, args)
                break
            case 'decompress':
                await decompress(workDir, args)
                break
        }

        parentPort.postMessage({})
    } catch (error) {
        throw new Error('Operation failed')
    }
};

await sendResult();
