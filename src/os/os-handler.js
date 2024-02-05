import {parentPort, workerData} from "worker_threads";
import {getEol} from "./getEol.js";
import {getCPUInfo} from "./getCPUInfo.js";
import {getHomedir} from "./getHomedir.js";
import {getUsername} from "./getUsername.js";
import {getArchitecture} from "./getArchitecture.js";

const sendResult = async () => {
    try {
        let {operation} = workerData
        const command = operation.toString();

        switch (command) {
            case 'os --EOL':
                await getEol()
                break
            case 'os --cpus':
                await getCPUInfo()
                break
            case 'os --homedir':
                await getHomedir()
                break
            case 'os --username':
                await getUsername()
                break
            case 'os --architecture':
                await getArchitecture()
                break
        }

        parentPort.postMessage({})
    } catch (error) {
        throw new Error('Operation failed')
    }
}

await sendResult();