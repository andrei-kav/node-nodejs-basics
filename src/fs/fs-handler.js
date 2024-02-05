import {parentPort, workerData} from 'worker_threads'
import {resolveDir} from "./resolveDir.js";
import {moveUp} from "./moveUp.js";
import {list} from "./list.js";
import {read} from "./read.js";
import {create} from "./create.js";
import {rename} from "./rename.js";
import {copy} from "./copy.js";

const sendResult = async () => {
    try {
        console.log('fs-handler')

        let {workDir, operation} = workerData
        const stringified = operation.toString().trim();
        const command = stringified.split(' ')[0]
        const args = stringified.slice(command.length).trim();
        
        switch (command) {
            case 'cd':
                workDir = await resolveDir(workDir, args)
                break
            case 'up':
                workDir = await moveUp(workDir)
                break
            case 'ls':
                await list(workDir)
                break
            case 'cat':
                await read(workDir, args)
                break
            case 'add':
                await create(workDir, args)
                break
            case 'rn':
                await rename(workDir, args)
                break
            case 'cp':
                await copy(workDir, args)
                break
        }
        parentPort.postMessage({workDir})
    } catch (error) {
        console.log('FS error', error)
        throw new Error('Operation failed')
    }
};

await sendResult();
