export const converter = (salary) => {
    if (salary >= 1000) {
        return salary / 1000 + 'K'
    }
}