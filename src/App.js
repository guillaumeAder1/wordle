import './App.css';
import Grid from './Grid.js'
import { useEffect, useState } from 'react';

function App() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  function handleKeyevent (e) {
    console.warn(word)
    const { key, keyCode } = e;
    console.warn(keyCode, key);
    // if hit enter to validate word
    if (keyCode === 13 && word.length === 5) {
      // todo
      wordIndex ++;
    }
    // delete last char
    if (keyCode === 8) {
      const max = word.length;
      setWord(word.slice(0, max - 1))
    }
    // not regular char
    if (!key.trim() || key.length > 1 || !alphabet.includes(key)) return
    // stop adding char to word if length is 5
    if (word.length === 5) return 

    setWord(word + key)
    console.warn(word)
  }
  useEffect(() => {
    window.addEventListener('keydown', handleKeyevent)
    return () => {
      window.removeEventListener('keydown', handleKeyevent)
    }
  })
  const [word, setWord] = useState('')
  let wordIndex = 0;
  const rows = Array(6).fill(null)
  return (
    <div
      className="App"
    >
      <h1>Wordle</h1>
      <h2>{word[wordIndex]}</h2>
      {rows.map((row, index) => <Grid key={index} currentWord={word} />)}

    </div>
  );
}

export default App;
