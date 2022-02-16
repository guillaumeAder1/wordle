import Box from './Box'


function Grid({ currentWord, wordStatus }) {
    const boxes = Array(5).fill(null)
  
    return (
        <div className='box-row' role='row'>
            {boxes.map((box, i) => (
                <Box
                    key={i}
                    value={currentWord[i] || ''}
                    color={wordStatus && wordStatus.length ? wordStatus[i].color : ''}
                />
            ))}
        </div>
    )
}
export default Grid;