
import Box from './Box'

function Grid({ currentWord, lastWord, word }) {
    const boxes = Array(5).fill(null)
    // const getClass = lastWord => {
    //     console.warn('getclass', lastWord)
    //     if (!lastWord) return;

    // }
    // useEffect(() => {
    //     console.log('validate row')
    // }, [lastWord])
    return (
        <div className='grid-container centered'>
            <div className='box-row'>
                {boxes.map((box, i) => (
                    <Box
                        key={i}
                        value={currentWord[i] || ''}
                    />
                ))}
            </div>
        </div>
    )
}
export default Grid;