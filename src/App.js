import React from 'react';
import './App.scss';
import Grid from './Grid'
import Keyboard from './Keyboard'
import { useState } from 'react';
import { useLoadNewWord, useCollectWords } from './hooks/'

const ctx = React.createContext();


function App() {

  // custom hooks & state
  const wordToFind = useLoadNewWord()
  const [currentWords, currentKeys] = useCollectWords(wordToFind, () => {
    console.log('curom hook callback', currentWords[0].data)
    const allData = currentWords.reduce((acc, val) => acc.concat(val.data), [])
    const map = allData.reduce((acc, d) => { 
      if (acc[d.value]) {
        acc[d.value] = d.color.rank < acc[d.value].rank ? d.color : acc[d.value];
      } else { 
        acc[d.value] = d.color
      }
      acc[d.value].value = acc[d.value].value === 'grey' ? '' : acc[d.value].value
      return acc;
    }, {})
    console.warn(map)

  });
  const [keyboardProps, setkeyboardProps] = useState({ keys: {}, lastWord: '', word: '' })
  const getLastWord = () => currentWords[currentWords.length - 1]?.value;


  return (
    <ctx.Provider value={ { wordToFind } }>
      <div
        className="App"
      >
        
        <h1>wordle</h1>
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
