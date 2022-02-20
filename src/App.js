import React from 'react';
import './App.scss';
import Grid from './Grid'
import Keyboard from './Keyboard'
import { useState } from 'react';
import { useLoadNewWord, useCollectWords } from './hooks/'

const ctx = React.createContext();


function App() {

  // custom hooks
  const wordToFind = useLoadNewWord()
  // setup state
  const [keyboardProps, setkeyboardProps] = useState({ keys: {}, lastWord: '', word: '' })
  const [currentWords, currentKeys] = useCollectWords(wordToFind);

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

        <Grid currentWords={currentWords}/>
        <Keyboard {...keyboardProps} />
      </div>
    </ctx.Provider>
  );
}

export default App;
