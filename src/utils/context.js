import {useReducer} from 'react'
import createUseContext from 'constate'

const ACTIONS = {
    LOADING: 'loading',
    LOGIN: "login",
    LOGOUT: "logout",
    SET_USER_DETAILS: "user_details"
}

const initialState = {
    user: {
        auth_token: ""
    },
    loggedIn: false,
    error: null
}

const reducer = (state, action) => {

    switch(action.type) {
        case ACTIONS.LOGIN:
            return {
                user: {
                    auth_token: action.user.auth_token
                },
                loggedIn: true
            }
        case ACTIONS.LOGOUT: 
            return {
                user: {
                    auth_token: ""
                },
                loggedIn: false
            }
        default: 
            return state
    }

}

const useLogin = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const {user, loggedIn} = state

    const login = (user) => {
        if(loggedIn === false) {
            console.log("logging in..")
            dispatch({
                type: ACTIONS.LOGIN,
                user: user
            })
        }
    } 

    const logout = () => {
        if(loggedIn === true) {
            console.log("logging out..")
            dispatch({
                type: ACTIONS.LOGOUT
            })
        }
    }

    const setUserDetails = (user_details) => {
        if(loggedIn == true) {
            dispatch({
                type: ACTIONS.SET_USER_DETAILS,
                user: user_details
            })
        }
    }

    return {user, loggedIn, login, logout, setUserDetails}
}


const initStateLoading = false

const loadingReducer = (state, action) => {
    console.log(action.type)
    switch(action.type) {
        case ACTIONS.LOADING: 
            return action.loading
        default:
            throw new Error('Unspecified type for loading!')
    }
}

const usePageLoader = () => {
    const [state, dispatch] = useReducer(loadingReducer, initStateLoading)
    const loading = state

    const setLoading = (value) => {
        console.log("trying set loading to => " + value)
        if(loading === value) return 
        else {
            dispatch({
                type: ACTIONS.LOADING,
                loading: value
            })
        }
    }

    return {loading, setLoading}
}

export const useLoginContext = createUseContext(useLogin)
export const usePageLoadingContext = createUseContext(usePageLoader)