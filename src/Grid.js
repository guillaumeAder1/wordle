import { useEffect } from 'react'
import Box from './Box'
import { validateWord } from './utils/utils'


function Grid({ currentWord, wordStatus }) {
    const boxes = Array(5).fill(null)
  
    return (
        <div className='grid-container centered'>
            <div className='box-row'>
                {boxes.map((box, i) => (
                    <Box
                        key={i}
                        value={currentWord[i] || ''}
                        color={wordStatus && wordStatus.length ? wordStatus[i].color : ''}
                    />
                ))}
            </div>
        </div>
    )
}
export default Grid;