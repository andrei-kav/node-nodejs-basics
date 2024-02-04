export const parseArgs = () => {
    const prefix = '--'
    const args = process.argv
        .filter(arg => arg.startsWith(prefix))
        .filter(arg => arg.includes('='))
        .map(value => [value.slice(prefix.length, value.indexOf('=')).toLowerCase(), value.slice(value.indexOf('=') + 1)])
        // .map(value => `${value.slice(prefix.length)} is ${process.argv[process.argv.indexOf(value) + 1]}`)
    console.log(new Map(args))

    return new Map(args)
};

// parseArgs();