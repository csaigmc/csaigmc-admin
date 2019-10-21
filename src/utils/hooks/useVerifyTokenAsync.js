import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import { BASE_URL } from 'cconfig'

export const useVerificationAsync = (token, defLoadState = false) => {
    const [loading, setLoading] = useState(defLoadState)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        if(loading === true) {
            fetchAsync()
        }
    }, [loading])

    const fetchAsync = async () => {
        if(token === null) {
            setLoading(false)
            setData(null)
            setError("Token Not Found")
            return
        }
        try{
            const result = await Axios.post(
                [BASE_URL, 'user', 'verify'].join('/'),
                null,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
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