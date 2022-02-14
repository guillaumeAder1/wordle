import { fireEvent } from "@testing-library/react"
export const typeWord = word => { 
  word.split('').forEach(char => fireEvent.keyDown(window, { key: char }))
}