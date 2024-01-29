import {isMainThread, parentPort, workerData} from 'worker_threads'
// n should be received from main thread
const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
    if (!isMainThread) {
        // get data from the main thread
        // do calculation and send back to the main thread
        const {number} = workerData
        const result = nthFibonacci(number)
        parentPort.postMessage(result)
    } else {
        console.log('worker.js, not main thread')
    }
};

sendResult();