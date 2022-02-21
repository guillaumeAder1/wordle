import { render, screen, fireEvent, getByRole, queryByRole } from '@testing-library/react';
import App from '../App';
import { typeWord, isWordInGrid } from './utils/keyboardEvent'
import { fetchNewWord } from '../utils/api'

jest.mock('../utils/api')

let gridContainer, keyboardContainer;

beforeEach(() => { 
  fetchNewWord.mockResolvedValue({ newWord: 'toast' })
  render(<App />)
  gridContainer = document.querySelector('.grid-container')
  keyboardContainer = document.querySelector('.keyboard-container')
})

test('app render title, keyboard and grid elements... TODO', () => {
  const linkElement = screen.getByText(/wordle/i);
  expect(linkElement).toBeInTheDocument();
});

describe('User input', () => {
  describe('on Grid', () => {
    test('user input should be displayed and removed with keyboard event', () => {
      // add char to grid
      fireEvent.keyDown(window, { key: 'a' })
      getByRole(gridContainer, 'cell', { name: 'a' })
      fireEvent.keyDown(window, { key: 'b' })
      getByRole(gridContainer, 'cell', { name: 'b' })
      // delete last char
      fireEvent.keyDown(window, { key: 'Backspace', keyCode: 8 })
      // 'b' should be removed
      expect(queryByRole(gridContainer, 'cell', { name: 'b' })).toBeNull()
      // 'a' should still be there
      getByRole(gridContainer, 'cell', { name: 'a' })
      // delete again
      fireEvent.keyDown(window, { key: 'Backspace', keyCode: 8 })
      // 'a' should be removed
      expect(queryByRole(gridContainer, 'cell', { name: 'a' })).toBeNull()
    })
    test('should validate the row when there is 5 char and should add corresponding class color', () => { 
      // add char to grid
      typeWord('toask')
      expect(isWordInGrid('toask', gridContainer).length).toBe(5)
      // hit enter key to validate the row
      fireEvent.keyDown(window, { keyCode: 13 })
      expect(document.querySelectorAll('.box.green').length).toBe(4)
    })
    test('should add next row when user keeps typing and fetchNewWord should be called only once per game', () => {
      typeWord('qwert')
      fireEvent.keyDown(window, { keyCode: 13 })
      typeWord('yuiop')
      fireEvent.keyDown(window, { keyCode: 13 })
      typeWord('asdfg')
      fireEvent.keyDown(window, { keyCode: 13 })
      typeWord('hjklz')
      fireEvent.keyDown(window, { keyCode: 13 })
      typeWord('xcvbn')
      fireEvent.keyDown(window, { keyCode: 13 })
      expect(isWordInGrid('qwert', gridContainer).length).toBe(5)
      expect(isWordInGrid('yuiop', gridContainer).length).toBe(5)
      expect(isWordInGrid('asdfg', gridContainer).length).toBe(5)
      expect(isWordInGrid('hjklz', gridContainer).length).toBe(5)
      expect(isWordInGrid('xcvbn', gridContainer).length).toBe(5)
      // called only once
      expect(fetchNewWord).toHaveBeenCalledTimes(1)
    })
  })

  describe('on keyboard', () => {
    test('should color and validate the keyboard keys when hitting enter', () => {
      //
      typeWord('terco')
      fireEvent.keyDown(window, { keyCode: 13 })
      // 
      expect(getByRole(keyboardContainer, 'cell', { name: 't' })).toHaveClass('green')
      expect(getByRole(keyboardContainer, 'cell', { name: 'e' })).toHaveClass('grey')
      expect(getByRole(keyboardContainer, 'cell', { name: 'r' })).toHaveClass('grey')
      expect(getByRole(keyboardContainer, 'cell', { name: 'c' })).toHaveClass('grey')
      expect(getByRole(keyboardContainer, 'cell', { name: 'o' })).toHaveClass('yellow')
    })
  })
})