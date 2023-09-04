import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {

    let loggedIn = true

    // loggedIn function from user-service file
    return loggedIn ? <Outlet /> : <Navigate to={"/login"} />

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
