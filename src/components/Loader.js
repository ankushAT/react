export const LoaderComponent = () => {
    return (
        <div style={loaderStyle} >
            <h1>Loading</h1>
        </div>
    )
}


const loaderStyle = {
    display: 'flex',
    alignItem: 'center',
    justifyContent: 'center'
}