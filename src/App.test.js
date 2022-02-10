import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

beforeEach(() => { 
  render(<App/>)
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