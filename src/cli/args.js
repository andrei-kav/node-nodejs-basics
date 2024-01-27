const parseArgs = () => {
    const prefix = '--'
    const args = process.argv
        .filter(arg => arg.startsWith(prefix))
        .map(value => `${value.slice(prefix.length)} is ${process.argv[process.argv.indexOf(value) + 1]}`)
    console.log(args.join(', '))
};

parseArgs();