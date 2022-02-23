
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

const validateChar = (wordToFind, char, index) => {
  const isPlaced = wordToFind[index] === char;
  if (isPlaced) return { rank: 1, value: 'green' }
  return wordToFind.includes(char) ? { rank: 2, value: 'yellow' } : { rank: 3, value: 'grey' }
}
const validateWord = (wordToFind, current) => current.map((char, i) => ({
  value: char,
  color: validateChar(wordToFind, char, i)
}));


export function useCollectUserInput(wordToFind, cb) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  const [currentKeys, setCurrentKeys] = useState([])
  const [currentWords, setCurrentWords] = useState([])
  const getLastWordIndex = () => currentWords.length ? currentWords.length - 1 : 0;

  const fn = e => {
    const { key, keyCode } = e
    //  game over, no more chances...
    if (currentWords.length === 7) return;
    // collect user inputs
    if (key.length === 1 && alphabet.includes(key) && currentKeys.length < 5) {
      const newKeys = [...currentKeys, key]
      setCurrentKeys(newKeys)

      currentWords[getLastWordIndex()] = {
        value: newKeys,
        data: newKeys.map(char => ({ value: char }))
      }
      setCurrentWords([
        ...currentWords,
      ])
    }
    // hit enter to validate word
    if (currentKeys.length === 5 && keyCode === 13) {
      const currentWord = currentKeys;
      const validate = validateWord(wordToFind, currentWord)
      
      currentWords[getLastWordIndex()] = {
        value: currentKeys.join(''),
        data: validate
      }
      setCurrentWords([
        ...currentWords,
        { value: '', data: [] }
      ])
      setCurrentKeys([])
      // call callback validation...
      cb && cb();
    }
    // delete last character of current word
    if (keyCode === 8) {
      currentKeys.pop();
      setCurrentKeys([
        ...currentKeys
      ])
      currentWords[getLastWordIndex()] = {
        value: currentKeys.join(''),
        data: currentKeys.map(char => ({ value: char }))
      }
      setCurrentWords([
        ...currentWords
      ])
    }
  }
  useEffect(() => {
    const keyboardContainer = document.querySelectorAll('.keyboard-container [role="cell"]')
    const proxyKeyboardEvent = e => {
      const value = e.target.textContent
      if (value.toLowerCase() === 'back') fn({ keyCode: 8, key: 'back' })
      else if (value.toLowerCase() === 'enter') fn({ keyCode: 13, key: 'enter' })
      else fn({ key: e.target.textContent })
    }
    window.addEventListener('keydown', fn)
    keyboardContainer.forEach(el => el.addEventListener('click', proxyKeyboardEvent))
    return () => {
      window.removeEventListener('keydown', fn)
      keyboardContainer.forEach(el => el.removeEventListener('click', proxyKeyboardEvent))
    }
  }, [fn])
  return currentWords;
}