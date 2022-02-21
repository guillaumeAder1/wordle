import { fireEvent, queryByRole } from "@testing-library/react"

export const typeWord = word => { 
  word.split('').forEach(char => fireEvent.keyDown(window, { key: char }))
}
// return all occurences of char from {word}
export const isWordInGrid = (word, container) => {
  return word.split('')
    .map(char => queryByRole(container, 'cell', { name: char }))
    .filter(Boolean)
}