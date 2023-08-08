const Base = ({ title = "Welcome to our website", children }) => {
    return (
        <div className="container-fluid">
            <h1>This is Header</h1>
            {children}
            <h1>This is Footer</h1>
        </div>
    )
}

export default Base;