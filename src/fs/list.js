import fs from "fs/promises"
import path from "path"

export const list = async (workDir) => {

    const getSet = (values, type) => {
        return values
            .filter(value => value.type === type)
            .sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return -1;
                }
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1;
                }
                return 0;
            })
    }

    const list = await fs.readdir(workDir)
        .then(files => {
            return Promise.all(files.map(async file => {
                let value = {
                    name: file,
                    type: 'unknown'
                }
                try {
                    const info = await fs.lstat(path.join(workDir, file))
                    value = {
                        name: file,
                        type: info.isFile() ? 'file' : 'directory'
                    }
                } catch {
                    // do not anything
                }
                return value
            }))
        })
        .then(parsed => {
            return [
                ...getSet(parsed, 'directory'),
                ...getSet(parsed, 'file'),
                ...getSet(parsed, 'unknown')
            ]
        })

    await new Promise((resolve) => setTimeout(resolve, 0))
        .then(() => console.table(list));
};
