
function Box({ id }) {
    return (
        <div
            onClick={() => console.log(id)}
            className="box"
        >
            { id }
        </div>
    )
}

export default  Box;