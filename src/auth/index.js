// isLoggedIn
export const isLoggedIn = () => {
    return (sessionStorage.getItem("data") != null) ? true : false
}

// doLogin
export const doLogin = (data, next) => {
    sessionStorage.setItem("data", JSON.stringify(data))
    next()
}

// doLogout
export const doLogout = (next) => {
    sessionStorage.removeItem("data")
    next();
}

// get curr User
export const getCurrUser = () => {
    return (isLoggedIn) ? JSON.parse(sessionStorage.getItem("data"))?.user : false;
}

// get token
export const getToken = () => {
    return (isLoggedIn) ? JSON.parse(sessionStorage.getItem("data"))?.token : false;
}