import { Navigate, Outlet } from "react-router-dom"
import { useState } from "react"
import { onAuthStateChanged, getAuth } from "firebase/auth"


function PrivateRoute() {

    const[loggedIn, setLoggedIn] = useState(false)
    const[checkStatus, setCheckStatus] = useState(true)

    const auth = getAuth()

    onAuthStateChanged(auth, (user) => {
        if(user) {
        setLoggedIn(true)
        setCheckStatus(false)
        } 
        setCheckStatus(false)
    })

    if(checkStatus) {
        return <h1>Loading...</h1>
    }

    if (loggedIn) {
        return <Outlet/>
    } 

    if(!loggedIn && !checkStatus) {
        return <Navigate to='/signin'/>
    }
}

export default PrivateRoute