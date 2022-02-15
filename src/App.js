import './App.scss';
import Grid from './Grid'
import Keyboard from './Keyboard'
import { useEffect, useState } from 'react';
import { validateWordRow, buildKeyMap } from './utils/utils'
import { fetchNewWord } from './utils/api'



function App() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  function handleKeyevent(e) {
    const { key, keyCode } = e;
    console.log(key, keyCode)
    // stop when all 6 chances are completed... end of game
    if (word.length === 7) {
      return
    }
    // if hit enter to validate word
    if (keyCode === 13 && word[lastIndex].length === 5) {
      // add new word[] item 
      setWord([...word, ''])
      setkeyboardProps({
        ...keyboardProps,
        keys: keyMap,
        lastWord: word[lastIndex],
      })
      // set word status for css classes
      setWordStatus([
        ...wordStatus,
        validateWordRow(word[lastIndex], wordToFind)
      ]);

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
  const [wordToFind, setWordToFind] = useState('')
  const [word, setWord] = useState([''])
  const [wordStatus, setWordStatus] = useState([])
  const [message, setMessage] = useState('')
  const [lastIndex, setLastIndex] = useState(0)
  const [keyMap, setKeyMap] = useState({})
  const [keyboardProps, setkeyboardProps] = useState({ keys: {}, lastWord: '', word: wordToFind })
  const rows = Array(6).fill(null)

 
  useEffect(() => {
    setLastIndex(word.length - 1);
    setKeyMap(buildKeyMap(word))
  }, [word])
  useEffect(() => {
    window.addEventListener('keydown', handleKeyevent)
    return () => {
      window.removeEventListener('keydown', handleKeyevent)
    }
  }, [handleKeyevent])
  useEffect(() => {
    async function fetch() {
      const data = await fetchNewWord()
      console.log(data)
      setWordToFind(data.newWord)
    }
    fetch()
  }, [])
  return (
    <div
    className="App"
    >
      <h1>Wordle</h1>
      <h2>{message || 'start typing...'}</h2>
      {
        rows.map((row, index) => <Grid
          key={index}
          currentWord={word[index] || ''}
          wordStatus={wordStatus[index]}
        />)
      }
      <Keyboard {...keyboardProps} />
    </div>
  );
}

export default App;
