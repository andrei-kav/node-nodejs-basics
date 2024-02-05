export const parseArgs = () => {
    const prefix = '--'
    const args = process.argv
        .filter(arg => arg.startsWith(prefix))
        .filter(arg => arg.includes('='))
        .map(value => [value.slice(prefix.length, value.indexOf('=')).toLowerCase(), value.slice(value.indexOf('=') + 1)])

    return new Map(args)
}