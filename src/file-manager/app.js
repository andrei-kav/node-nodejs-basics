import {Transform} from 'stream'
import {pipeline} from 'stream'
import {homedir} from 'os'
import {parseArgs} from "../cli/args.js";
import {Worker} from "worker_threads";
import {fsHandlerPath, isFSCommand} from "../fs/helpers.js";

const run = async () => {

    const args = parseArgs()
    const userName = args.get('username') || 'unknown user'

    let workDir = homedir()

    const getLocationMessage = () => `You are currently in ${workDir}\n`

    process.stdout.write(`Welcome to the File Manager, ${userName}!\n`)
    process.stdout.write(getLocationMessage())
    // console.log(`Welcome to the File Manager, ${userName}!`)

    const parseInput = new Transform({
        transform(chunk, encoding, callback) {
            const stringified = chunk.toString().trim();
            if (stringified === '.exit') {
                process.exit(0);
            }
            this.push(stringified)
            callback()
        }
    })

    const handle = new Transform({
        transform(chunk, encoding, callback) {
            const stringified = chunk.toString().trim();
            const command = stringified.split(' ')[0];

            if (isFSCommand(command)) {
                const worker = new Worker(fsHandlerPath(), {workerData: {workDir: workDir, operation: stringified}})
                worker.on('message', (result) => {
                    workDir = result.workDir
                    // emitFinish()
                    this.push(getLocationMessage());
                }).on('error', () => {
                    this.push('Operation failed\n');
                    this.push(getLocationMessage());
                    // emitFail()
                })
            } else {
                this.push('Invalid input\n');
                this.push(getLocationMessage());
            }
            callback()
        }
    })

    pipeline(process.stdin, parseInput, handle, process.stdout, (err) => {
        if (err) {
            console.log('err', err)
        } else {
            console.log('finish')
        }
    });
    process
        .on('exit', () => {
            console.log("STREAM EXITED - TRANSFORM");
            console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
        })
        .on('SIGINT', () => {
            // after ctrl + C clicked
            console.log("STREAM SIGINT - TRANSFORM");
            process.exit(0)
        })
        // .on('operation-failed', () => {
        //     console.log("STREAM operation-failed - TRANSFORM");
        //     console.log(`Operation failed`)
        //     emitFinish()
        // })
        // .on('operation-finished', () => {
        //     console.log("STREAM operation-finished - TRANSFORM");
        //     console.log(`You are currently in ${workDir}`)
        // })
};

await run();
