
function Box({ value, color }) {
    return (
        <div
            onClick={() => console.log(value)}
            className={`${color} box`}
        >
            { value }
        </div>
    )
}

export default  Box;