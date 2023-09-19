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
    return (isLoggedIn) ? JSON.parse(localStorage.getItem("data"))?.user : false;
}

// get token
export const getToken = () => {
    return (isLoggedIn) ? JSON.parse(localStorage.getItem("data"))?.token : false;
}

// Update user - upload image
// export const updateUser = (data) => {
//     doLogin(data, () => {
//         return;
//     })
// }