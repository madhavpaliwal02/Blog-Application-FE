import MyNavbar from "./MyNavbar";

const Base = ({ title = "Welcome to our website", children }) => {
    return (
        <div className="container-fluid">
            {/* <h1>This is Header</h1> */}
            <MyNavbar />
            {children}
            <h4>This is Footer</h4>
        </div>
    )
}

export default Base;