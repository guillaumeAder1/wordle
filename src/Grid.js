import Box from './Box'
import React from 'react'

function Grid({ currentWords }) {
    const rows = Array(6).fill(null)
    const cells = Array(5).fill(null)
    console.log('rendeing Grid', currentWords)
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
export default React.memo(Grid);