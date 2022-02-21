import React from 'react'

function Keyboard({ keysMap }) {
    const qwerty = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
    const asdf = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']
    const zxcv = ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Back']
    const getClass = char => keysMap?.[char]?.value || '' 
    return (
        <div className="keyboard-container centered">
            <div role="row">
                {qwerty.map(char => <span key={char} role="cell" className={`${getClass(char)} gap`}>{char}</span>)}
            </div>
            <div role="row">
                {asdf.map(char => <span key={char} role="cell" className={`${getClass(char)} gap`}>{char}</span>)}
            </div>
            <div role="row">
                {zxcv.map(char => <span key={char} role="cell" className={`${getClass(char)} gap`}>{char}</span>)}
            </div>
        </div>
    )
}

export default React.memo(Keyboard)