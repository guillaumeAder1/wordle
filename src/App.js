import './App.css';
import Grid from './Grid'
import Keyboard from './Keyboard'
import { useEffect, useState } from 'react';

function App() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  function handleKeyevent(e) {
    const { key, keyCode } = e;
    // stop when all 6 chances are completed... end of game
    if (word.length === 7) {
      return
    }
    // if hit enter to validate word
    if (keyCode === 13 && word[lastIndex].length === 5) {
      // todo
      setWord([...word, ''])
      setkeyboardProps({
        ...keyboardProps,
        keys: keyMap,
        lastWord: word[lastIndex],
      })
      // end of game message
      if (word.length === 6) setMessage('Game over...')
    }
    // delete last char
    if (keyCode === 8) {
      const max = word[lastIndex].length;
      word[lastIndex] = word[lastIndex].slice(0, max - 1)
      setWord([...word])
    }
    // not regular char
    if (!key.trim() || key.length > 1 || !alphabet.includes(key)) return
    // stop adding char to word if length is 5
    if (word[lastIndex].length === 5) return

    word[lastIndex] += key
    setWord([...word])
    setMessage(word[lastIndex])
  }
  const wordToFind = 'toast'
  const [word, setWord] = useState([''])
  const [message, setMessage] = useState('')
  const [lastIndex, setLastIndex] = useState(0)
  const [keyMap, setKeyMap] = useState({})
  const [keyboardProps, setkeyboardProps] = useState({ keys: {}, lastWord: '', word: wordToFind })
  const rows = Array(6).fill(null)

  const buildKeyMap = words => {
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
    setKeyMap(map);
  }
  useEffect(() => {
    setLastIndex(word.length - 1);
    buildKeyMap(word)
  }, [word])
  useEffect(() => {
    window.addEventListener('keydown', handleKeyevent)
    return () => {
      window.removeEventListener('keydown', handleKeyevent)
    }
  })
  return (
    <div
      className="App"
    >
      <h1>Wordle</h1>
      <h2>{message}</h2>
      {
        rows.map((row, index) => <Grid
          key={index}
          currentWord={word[index] || []}
          {...keyboardProps}
        />)
      }

      <Keyboard {...keyboardProps} />
    </div>
  );
}

export default App;
