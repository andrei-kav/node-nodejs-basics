import {parentPort, workerData} from 'worker_threads'
import {calculateHash} from "./calcHash.js";

const sendResult = async () => {
    try {
        let {workDir, operation} = workerData
        const stringified = operation.toString();
        const command = stringified.split(' ')[0]
        const args = stringified.slice(command.length).trim();

        if (command === 'hash') {
            await calculateHash(workDir, args)
        }

        parentPort.postMessage({})
    } catch (error) {
        throw new Error('Operation failed')
    }
};

await sendResult();
