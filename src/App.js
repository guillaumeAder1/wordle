import './App.css';
import Grid from './Grid'
import Keyboard from './Keyboard'
import { useEffect, useState } from 'react';

function App() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  function handleKeyevent (e) {
    const { key, keyCode } = e;
    // console.warn(keyCode, key);
    // if hit enter to validate word
    if (keyCode === 13 && word[lastIndex].length === 5) {
      // todo
      setWord([...word, ''])
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
    // buildKeyMap(key)
  }
  const [word, setWord] = useState([''])
  const [lastIndex, setLastIndex] = useState(0)
  const [keyMap, setKeyMap] = useState({})
  const rows = Array(6).fill(null)
  const buildKeyMap = char => {
    if (keyMap[char]) {
      keyMap[char] ++
    } else {
      keyMap[char] = 1
    }
    setKeyMap({ ...keyMap })
  }
  useEffect(() => {
    setLastIndex(word.length - 1);
    console.warn(word)
    const lastword = word[lastIndex]
    if (word[lastIndex].length) {
      const lastchar = lastword[word[lastIndex].length - 1]
      buildKeyMap(lastchar)
    }
    // console.log(lastchar)
  }, [word, lastIndex])
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
      <h2>{word[lastIndex]}</h2>
      {rows.map((row, index) => <Grid key={index} currentWord={word[index] || []} />)}

      <Keyboard keys={keyMap} word="test" />

    </div>
  );
}

export default App;
