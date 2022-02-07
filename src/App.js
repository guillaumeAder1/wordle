import './App.css';
import Grid from './Grid.js'
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
      setWord([word[lastIndex].slice(0, max - 1)])
    }
    // not regular char
    if (!key.trim() || key.length > 1 || !alphabet.includes(key)) return
    // stop adding char to word if length is 5
    if (word[lastIndex].length === 5) return 
    
    word[lastIndex] += key
    setWord([...word])
  }
  const [word, setWord] = useState([''])
  const [lastIndex, setLastIndex] = useState(0)
  const rows = Array(6).fill(null)
  useEffect(() => {
    setLastIndex(word.length - 1);
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
      <h2>{word[lastIndex]}</h2>
      {rows.map((row, index) => <Grid key={index} currentWord={word[index] || []} />)}

    </div>
  );
}

export default App;
