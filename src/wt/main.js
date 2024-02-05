import {Worker} from 'worker_threads'
import {getPaths} from "../helpers/get-paths.js";
import path from "path";
import os from "os";

const {__dirname} = getPaths(import.meta.url)

const performCalculations = async () => {
    const workerPath = path.join(__dirname, 'worker.js')
    const corsNumber = os.cpus().length
    let start = 10
    Promise.all(Array(corsNumber).fill('').map(_ => {
        return new Promise((resolve, reject) => {
            // create new worker with new data
            // and listen to event
            const worker = new Worker(workerPath, {workerData: {number: start++}})
            worker.on('message', (result) => {
                resolve({status: 'resolved', data: result})
            }).on('error', () => {
                resolve({status: 'error', data: null})
            })
        })
    })).then((results) => {
        console.log(results)
    })
};

await performCalculations();