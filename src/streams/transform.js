import {Transform} from 'stream'

const transform = async () => {

    const reverse = new Transform({
        transform(chunk, encoding, callback) {
            this.push(chunk.reverse())
            callback()
        }
    })

    // reverse process.stdin data and write it into process.stdout
    process.stdin
        .pipe(reverse)
        .pipe(process.stdout)
};

await transform();