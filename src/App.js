import React from 'react';
import './App.scss';
import Grid from './Grid'
import Keyboard from './Keyboard'
import { useState } from 'react';
import { useLoadNewWord, useCollectUserInput } from './hooks/'

const ctx = React.createContext();

const buildKeysMap = currentWords => {
  const allData = currentWords.reduce((acc, val) => acc.concat(val.data), [])
  const keysMap = allData.reduce((acc, d) => { 
    if (acc[d.value]) {
      acc[d.value] = d.color.rank < acc[d.value].rank ? d.color : acc[d.value];
    } else { 
      acc[d.value] = d.color
    }
    return acc;
  }, {})
  return keysMap;
}

function App() {
  // custom hooks & state
  const [keyboardKeysMap, setKeyboardKeysMap] = useState({})
  const wordToFind = useLoadNewWord()
  const currentWords = useCollectUserInput(
    wordToFind,
    () => setKeyboardKeysMap(buildKeysMap(currentWords))
  );

  return (
    <ctx.Provider value={ { wordToFind } }>
      <div
        className="App"
      >
        <h1>Wordle</h1>
        <Grid currentWords={currentWords}/>
        <Keyboard keysMap={keyboardKeysMap} />
      </div>
    </ctx.Provider>
  );
}

export default App;
