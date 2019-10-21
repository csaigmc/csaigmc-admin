import React, {lazy} from 'react'
import { usePageLoadingContext } from './context'
import { loadfile } from './loadfile'


/**
 * TODO
 * Show progress bar when loading another page 
 */
const Complaints = lazy(async () => {
    const data = await import('components/Complaints/Complaints')
    return data
})
const Notifications = lazy(async () => {
    const data = await import('components/Notifications/Notifications')
    return data
})
const Students = lazy(async () => {
    const data = await import('components/Students/Students')
    return data
})
const Clubs = lazy(async () => {
    const data = await import('components/Clubs/Clubs')
    return data
})
const Login = lazy(async () => {
    const data = await import('components/Login')
    return data
})

export const routes = {
    '/complaints': () => <Complaints />,
    '/clubs*': () => <Clubs />,
    '/students': () => <Students />, 
    '/notifications': () => <Notifications />,
    '/login': () => <Login />
}