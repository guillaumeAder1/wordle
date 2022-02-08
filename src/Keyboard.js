
function Keyboard({ keys, word }) {
    const qwerty = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
    const asdf = ['a', 's', 'd', 'f', 'g', 'h' ,'j' ,'k' ,'l']
    const zxcv = ['z', 'x', 'c', 'v', 'b', 'n', 'm']
    const getClass = char => {
        return keys[char] ? 'active' : ''
    }
    return (
        <div className="keyboard-container centered">
            <div>
                {qwerty.map(char => <span key={char} className={getClass(char)}>{ char }</span>)}
            </div>
            <div>
                {asdf.map(char => <span key={char} className={getClass(char)}>{ char }</span>)}
            </div>
            <div>
                {zxcv.map(char => <span key={char} className={getClass(char)}>{ char }</span>)}
            </div>
        </div>
    )
}

export default Keyboard