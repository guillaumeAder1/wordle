import React from 'react';
import './App.scss';
import Grid from './Grid'
import Keyboard from './Keyboard'
import { useEffect, useState } from 'react';
import { validateWordRow, buildKeyMap } from './utils/utils'
import { useKeyboardEvent, useLoadNewWord, useCollectWords } from './hooks/'

const ctx = React.createContext();


function App() {

  function handleKeyevent(e) {
    const { key, keyCode } = e;
    // stop when all 6 chances are completed... end of game
    if (word.length === 7) {
      return
    }
    // if hit enter to validate word
    if (keyCode === 13 && word[lastIndex].length === 5) {
      // add new word[] item 
      
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
  // const vars
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  // custom hooks
  // useKeyboardEvent(handleKeyevent)
  const wordToFind = useLoadNewWord()
  // context
  // setup state
  const [word, setWord] = useState([''])
  const [wordStatus, setWordStatus] = useState([])
  const [message, setMessage] = useState('')
  const [lastIndex, setLastIndex] = useState(0)
  const [keyMap, setKeyMap] = useState({})
  const [keyboardProps, setkeyboardProps] = useState({ keys: {}, lastWord: '', word: '' })

  const [currentWords, currentKeys] = useCollectWords(wordToFind);
 
  useEffect(() => {
    setLastIndex(word.length - 1);
    setKeyMap(buildKeyMap(word))
  }, [word])

  const getLastWord = () => currentWords[currentWords.length - 1]?.value;


  return (
    <ctx.Provider value={ { wordToFind } }>
      <div
        className="App"
      >
        
        <h1>currentWords</h1>
        <code>
          {JSON.stringify(currentWords, null, 2)}
        </code>
        
        <div>lastWord: {getLastWord()} </div>
        
        <div>currentKeys: {currentKeys}</div>
        //
        <p>
          {/* current word: { currentWords } */}
        </p>
        {/* <h2>{message || 'start typing...'}</h2> */}
        <Grid currentWords={currentWords}/>
        {/* <div className='grid-container centered'>
          {
            rows.map((row, index) => <Grid
              key={index}
              currentWord={word[index] || ''}
              wordStatus={wordStatus[index]}
            />)
          }
        </div> */}
        <Keyboard {...keyboardProps} />
      </div>
    </ctx.Provider>
  );
}

export default App;
