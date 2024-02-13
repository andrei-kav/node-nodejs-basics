import path from 'path'
export const moveUp = async (current) => {
    if (current === path.parse(current).root) {
        return current
    }
    return path.join(current, '..')
}