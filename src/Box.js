import React from 'react';

function Box({ value, color }) {
    console.log('rendering Box - ' + value)
    return (
        <div
            role="cell"
            onClick={() => console.log(value)}
            className={`${color} box`}
        >
            {value}
        </div>
    )
}

export default React.memo(Box);
