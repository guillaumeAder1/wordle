import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { typeWord } from './utils/utils'
import { fetchNewWord } from '../utils/api'

jest.mock('../utils/api')

beforeEach(() => { 
  fetchNewWord.mockResolvedValue({ newWord: 'toast' })
  render(<App />)
})



test('app render', () => {
  const linkElement = screen.getByText(/wordle/i);
  expect(linkElement).toBeInTheDocument();
});

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
  screen.getByRole('cell', { name: 't' })
  screen.getByRole('cell', { name: 'o' })
  screen.getByRole('cell', { name: 'a' })
  screen.getByRole('cell', { name: 's' })
  screen.getByRole('cell', { name: 'k' })
  // hit enter key to validate the row
  await fireEvent.keyDown(window, { keyCode: 13 })
  // screen.debug(
  //   screen.getAllByRole('row')[0]
  // )
  expect(document.querySelectorAll('.box.green').length).toBe(4)
})