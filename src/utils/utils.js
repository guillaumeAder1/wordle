export const validateWord = (current, word) => {
    return current.split('').map((char, index) => {
        const placed = char === word[index] ? 'green' : ''
        const found = word.includes(char) ? 'yellow' : ''
        return { color: placed || found }
    })
}