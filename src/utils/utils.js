export const validateWordRow = (current, word) => {
    return current.split('').map((char, index) => {
        const placed = char === word[index] ? 'green' : ''
        const found = word.includes(char) ? 'yellow' : ''
        return { color: placed || found }
    })
}

export const buildKeyMap = words => {
    const map = {}
    for (const word of words) {
        for (const char of word) {
            if (map[char]) {
                map[char]++
            } else {
                map[char] = 1
            }
        }
    }
    return map;
}