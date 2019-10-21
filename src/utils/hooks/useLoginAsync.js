import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import { BASE_URL } from 'cconfig'

export const useLoginAsync = ({user, defLoadState}) => {
    const [loading, setLoading] = useState(defLoadState)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        if(loading === true) {
            fetchAsync()
        }
    }, [loading])

    const fetchAsync = async () => {
        try{
            const result = await Axios.post(
                [BASE_URL, 'user', 'login'].join('/'), 
                {
                    username: user.username,
                    password: user.password
                }
            )
            setData(result)
            setLoading(false)
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }

    return {
        loading, 
        data, 
        error,
        setLoading
    }
}