import {Transform} from 'stream'
import {pipeline} from 'stream'
import {homedir} from 'os'
import {parseArgs} from "../cli/args.js";
import {Worker} from "worker_threads";
import {fsHandlerPath, isFSCommand} from "../fs/helpers.js";
import {isOSCommand, osHandlerPath} from "../os/helpers.js";
import {hashHandlerPath, isHashCommand} from "../hash/helpers.js";
import {isZIPCommand, zipHandlerPath} from "../zip/helpers.js";
import * as constants from "constants";

const run = async () => {

    const args = parseArgs()
    const userName = args.get('username') || 'unknown user'

    let workDir = homedir()

    const getLocationMessage = () => `You are currently in ${workDir}\n`

    process.stdout.write(`Welcome to the File Manager, ${userName}!\n`)
    process.stdout.write(getLocationMessage())

    const parseInput = new Transform({
        transform(chunk, encoding, callback) {
            const stringified = chunk.toString().trim()
            if (stringified === '.exit') {
                process.exit(0);
            }
            this.push(stringified)
            callback()
        }
    })

    const handle = new Transform({
        transform(chunk, encoding, callback) {
            const stringified = chunk.toString();
            let handlerPath = null

            if (isFSCommand(stringified)) {
                handlerPath = fsHandlerPath()
            } else if (isOSCommand(stringified)) {
                handlerPath = osHandlerPath()
            } else if (isHashCommand(stringified)) {
                handlerPath = hashHandlerPath()
            } else if (isZIPCommand(stringified)) {
                handlerPath = zipHandlerPath()
            } else {
                this.push('Invalid input\n');
                this.push(getLocationMessage());
            }

            if (handlerPath) {
                // do calculation
                // main part!
                const worker = new Worker(handlerPath, {workerData: {workDir: workDir, operation: stringified}})
                worker.on('message', (result) => {
                    if (result && result.workDir) {
                        workDir = result.workDir
                    }
                    this.push(getLocationMessage());
                }).on('error', (err) => {
                    this.push('Operation failed\n');
                    this.push(getLocationMessage());
                })
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

    // handle process finish
    process
        .on('exit', () => {
            process.stdout.write(`Thank you for using File Manager, ${userName}, goodbye!\n`);
        })
        .on('SIGINT', () => {
            // after ctrl + C clicked
            process.exit(0)
        })
};

await run();
