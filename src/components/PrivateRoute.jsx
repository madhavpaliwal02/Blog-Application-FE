import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isLoggedIn } from '../auth'

const PrivateRoute = () => {

    let loggedIn = true

    // loggedIn function from auth/index.js file
    // return loggedIn ? <Outlet /> : <Navigate to={"/login"} />
    return isLoggedIn() ? <Outlet /> : <Navigate to={"/login"} />

    // return (
    //     <>
    //         <div>
    //             this is private route
    //         </div>

    //         <Outlet />
    //     </>
    // )
}

export default PrivateRoute
