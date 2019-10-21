import React from 'react'
import { useLoginContext } from './context'
import {navigate} from 'hookrouter'
import Login from 'components/Login'

export const withAdminAuth = (AdminComponent) => {
    return (props) => {
        const {loggedIn} = useLoginContext()

        console.log("log Status:" + loggedIn)

        if(loggedIn === true) {
            return <AdminComponent {...props}/>
        } else {
            navigate('/login', true)
            return <Login />    
        }
    }
} 