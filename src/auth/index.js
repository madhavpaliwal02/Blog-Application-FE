// isLoggedIn
export const isLoggedIn = () => {
    return (localStorage.getItem("data") != null) ? true : false
}

// doLogin
export const doLogin = (data, next) => {
    localStorage.setItem("data", JSON.stringify(data))
    next()
}

// doLogout
export const doLogout = (next) => {
    localStorage.removeItem("data")
    next();
}

// get curr User
export const getCurrUser = () => {
    return (isLoggedIn) ? JSON.stringify(localStorage.getItem("data")) : false;
}