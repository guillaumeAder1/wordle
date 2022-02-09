
function Box({ value }) {
    return (
        <div
            onClick={() => console.log(value)}
            className="box"
        >
            { value }
        </div>
    )
}

export default  Box;