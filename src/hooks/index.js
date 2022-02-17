
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
const validateChar = (wordToFind, char, index) => {
  const isPlaced = wordToFind[index] === char;
  if (isPlaced) return 'green'
  return wordToFind.includes(char) ? 'yellow' : 'grey'
}
const validateWord = (wordToFind, current) => {
  const m = current.map((char, i) => ({
    value: char,
    color: validateChar(wordToFind, char, i)
  }));
  return m
}

export function useCollectWords(wordToFind) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  const [currentKeys, setCurrentKeys] = useState([])
  const [currentWords, setCurrentWords] = useState([])

  const fn = e => {
    const { key, keyCode } = e
    if (currentWords.length === 6) return;
    console.log(currentWords.current)
    // collect user inputs
    if (key.length === 1 && alphabet.includes(key) && currentKeys.length < 5) {
      setCurrentKeys([
        ...currentKeys,
        key
      ])
    }
    // hit enter to validate word
    if (currentKeys.length === 5 && keyCode === 13) {
      const currentWord = currentKeys;
      const validate = validateWord(wordToFind, currentWord)
      setCurrentWords([
        ...currentWords,
        {
          value: currentKeys.join(''),
          data: validate,
        }
      ])
      setCurrentKeys([])
    }
    // delete last chararcter of current word
    if (keyCode === 8) {
      const newKeys = currentKeys.slice(0, currentKeys.length - 1)
      setCurrentKeys([
        ...newKeys
      ])
    }
  }
  useEffect(() => {
    console.warn('mounted')
    window.addEventListener('keydown', fn)
    return () => {
      window.removeEventListener('keydown', fn)
    }
  }, [fn])
  return [currentWords, currentKeys];
}