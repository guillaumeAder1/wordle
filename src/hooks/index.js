
import { useEffect, useState } from 'react';
import { fetchNewWord } from '../utils/api'


export function useLoadNewWord() { 
  const [newWord, setNewWord] = useState(null)  
  useEffect(() => {
    console.log('fetch new word')
    async function fetch() {
      const data = await fetchNewWord()
      console.log(data)
      // setWordToFind(data.newWord)
      setNewWord(data.newWord)
    }
    fetch()
  }, [])
  return newWord;
}
export function useKeyboardEvent(fn) { 
 useEffect(() => {
    window.addEventListener('keydown', fn)
    return () => {
      window.removeEventListener('keydown', fn)
    }
  }, [fn])
}