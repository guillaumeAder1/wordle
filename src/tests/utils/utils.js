import { fireEvent, screen } from "@testing-library/react"

export const typeWord = word => { 
  word.split('').forEach(char => fireEvent.keyDown(window, { key: char }))
}
// return all occurences of char from {word}
export const isWordInGrid = word => word.split('')
  .map(char => screen.queryByRole('cell', { name: char }))
  .filter(Boolean)
