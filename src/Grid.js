
import Box from './Box'

function Grid({ currentWord }) {
    const boxes = Array(5).fill(null)
    return (
        <div>
            {/* <div>
                { currentWord.slice(0, 5) }
            </div> */}
            <div className='box-row'>
                {boxes.map((box, i) => (
                    <Box
                        key={i}
                        id={currentWord[i] || ''}
                    />
                ))}
            </div>
        </div>
    )
}
export default Grid;