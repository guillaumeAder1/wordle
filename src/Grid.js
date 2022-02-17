import Box from './Box'


// function Grid({ currentWord, wordStatus }) {
//     const boxes = Array(5).fill(null)
//     return (
//         <div className='box-row' role='row'>
//             {boxes.map((box, i) => (
//                 <Box
//                     key={i}
//                     value={currentWord[i] || ''}
//                     color={wordStatus && wordStatus.length ? wordStatus[i].color : ''}
//                 />
//             ))}
//         </div>
//     )
// }

// rows.map((row, index) => <Grid
// key={index}
// currentWord={word[index] || ''}
// wordStatus={wordStatus[index]}
// />)
function Grid({ currentWords }) {
    const rows = Array(6).fill(null)
    const cells = Array(5).fill(null)
    return (
        <div className='grid-container centered'>
            <b>
                {/* {currentWords} */}
            </b>
            {
                rows.map((row, rowIdx) => 
                    <div key={rowIdx} className='box-row' role='row'>      
                        {
                            cells.map((cell, cellIdx) =>
                                <Box
                                    key={`${rowIdx}-${cellIdx}`}
                                    value={currentWords[rowIdx]?.data[cellIdx]?.value || ''}
                                    color={currentWords[rowIdx]?.data[cellIdx]?.color || ''}
                                />
                            )
                        }
                    </div>
                )
            }
      </div>
    )
}
export default Grid;