import { render, screen, fireEvent, getByRole } from '@testing-library/react';
import App from '../App';
import { typeWord, isWordInGrid } from './utils/utils'
import { fetchNewWord } from '../utils/api'

jest.mock('../utils/api')

beforeEach(() => { 
  fetchNewWord.mockResolvedValue({ newWord: 'toast' })
  render(<App />)
})

test('app render title, keyboard and grid elements... TODO', () => {
  const linkElement = screen.getByText(/wordle/i);
  expect(linkElement).toBeInTheDocument();
});

describe('User input', () => {
  describe('on Grid', () => {
    test('user input should be displayed and removed with keyboard event', async () => {
      // add char to grid
      fireEvent.keyDown(window, { key: 'a' })
      screen.getByRole('cell', { name: 'a' })
      fireEvent.keyDown(window, { key: 'b' })
      screen.getByRole('cell', { name: 'b' })
      // delete last char
      fireEvent.keyDown(window, { key: 'Backspace', keyCode: 8 })
      screen.getByRole('cell', { name: 'a' })
      expect(screen.queryByRole('cell', { name: 'b' })).toBeNull()
      fireEvent.keyDown(window, { key: 'Backspace', keyCode: 8 })
      expect(screen.queryByRole('cell', { name: '1' })).toBeNull()
    })
    test('should validate the row when there is 5 char and should add corresponding class color', async () => { 
      // add char to grid
      typeWord('toask')
      expect(isWordInGrid('toask').length).toBe(5)
      // hit enter key to validate the row
      await fireEvent.keyDown(window, { keyCode: 13 })
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
      expect(isWordInGrid('qwert').length).toBe(5)
      expect(isWordInGrid('yuiop').length).toBe(5)
      expect(isWordInGrid('asdfg').length).toBe(5)
      expect(isWordInGrid('hjklz').length).toBe(5)
      expect(isWordInGrid('xcvbn').length).toBe(5)
      // called only once
      expect(fetchNewWord).toHaveBeenCalledTimes(1)
    })
  })

  describe.only('on keyboard', () => {
    test('should color and validate the keyboard keys when hitting enter', () => {
      const keyboardContainer = document.querySelector('.keyboard-container')
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