
function Box({ value, color }) {
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

export default Box;
const toto = srt => {
    console.warn()
}