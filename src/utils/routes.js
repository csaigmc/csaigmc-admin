import React, {lazy} from 'react'
import { usePageLoadingContext } from './context'
import { loadfile } from './loadfile'


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

const Members = lazy(async () => {
    const data = await import('components/Members/Members')
    return data
})
const Gallery = lazy(async () => {
    const data = await import('components/Gallery/Gallery')
    return data
})
const Advisory = lazy(async () => {
    const data = await import('components/Advisory/Advisory')
    return data
})
const Papers = lazy(async () => {
    const data = await import('components/Papers/Papers')
    return data
})


export const routes = {
    '/admin/complaints': () => <Complaints />,
    '/admin/clubs*': () => <Clubs />,
    '/admin/students': () => <Students />, 
    '/admin/notifications': () => <Notifications />,
    '/admin/papers': () => <Papers />,
    '/admin/login': () => <Login />,
    '/admin/members': () => <Members />,
    '/admin/gallery': () => <Gallery />,
    '/admin/advisory': () => <Advisory />
}