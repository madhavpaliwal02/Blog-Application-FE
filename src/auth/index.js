// isLoggedIn
export const isLoggedIn = () => {
    return (localStorage.getItem("email") != null) ? true : false
}

// doLogin
export const doLogin = (data, next) => {
    localStorage.setItem("userId", data.id)
    localStorage.setItem("email", data.email)
    next()
}

// doLogout
export const doLogout = (next) => {
    localStorage.removeItem("email")
    localStorage.removeItem("userId")
    next();
}

// get curr User
export const getCurrUser = () => {
    // return (isLoggedIn) ? JSON.stringify(localStorage.getItem("data")) : false;
    const user = {
        id: localStorage.getItem("userId"),
        email: localStorage.getItem("email"),
    }
    return (isLoggedIn) ? user : false;
}