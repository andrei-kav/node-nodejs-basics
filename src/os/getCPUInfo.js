import os from "os";
export const getCPUInfo = async () => {
    const list = os.cpus().map(value => {
        return {
            model: value.model,
            'clock rate': `${value.speed / 1000} GHz`
        }
    })

    await new Promise((resolve) => setTimeout(resolve, 0))
        .then(() => console.table(list));
}