import {Transform} from 'stream'

const transform = async () => {

    const transform = new Transform({
        transform(chunk, encoding, callback) {
            this.push(chunk.reverse())
            callback()
        }
    })

    // revert process.stdin data and write it into process.stdout
    process.stdin
        .pipe(transform)
        .pipe(process.stdout)
};

await transform();