import Footer from "./Footer";
import MyNavbar from "./MyNavbar";

const Base = ({ title = "Welcome to our website", children }) => {
    return (
        <div className="container-fluid"
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column"
            }}
        >
            {/* <h1>This is Header</h1> */}
            <MyNavbar />
            {children}
            <div style={{
                marginTop: "auto"
            }}>
                <Footer />
            </div>
        </div>
    )
}

export default Base;