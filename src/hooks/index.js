
import { useEffect, useState } from 'react';
import { fetchNewWord } from '../utils/api'


export function useLoadNewWord() { 
  const [newWord, setNewWord] = useState(null)  
  useEffect(() => {
    async function fetch() {
      const data = await fetchNewWord()
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