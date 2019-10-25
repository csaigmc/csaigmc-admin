import React, {useState, useEffect} from 'react'
import { navigate } from 'hookrouter'
import 'common/css/theme.css'
import { isNotEmpty } from 'utils/utils'
import { useLoginContext } from 'utils/context'
import { useLoginAsync } from 'utils/hooks/useLoginAsync'
import { useLocalstorage } from 'utils/hooks/useLocalStorage'
import { useVerificationAsync } from 'utils/hooks/useVerifyTokenAsync'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { useStyles } from 'utils/preset_styles'
import LinearProgress from '@material-ui/core/LinearProgress'

const cstyles= makeStyles(theme => ({
    heading: {
        color: theme.palette.primary.main,
    }
}))

const Login = () => {

    console.log('inside login')

    const classes = useStyles()
    const cclasses = cstyles()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState('')

    const {login} = useLoginContext()
    
    const {getItem, setItem} = useLocalstorage()
    const token = getItem('authToken')

    const verifyAsync = useVerificationAsync(token, true)

    useEffect(() => {
        if(verifyAsync.loading === false) {
            if(verifyAsync.data !== null) {
                if(verifyAsync.data.data !== null && verifyAsync.data.data.auth_token !== null){
                    login(verifyAsync.data.data)
                    navigate('/')
                }
            } 
        }
    }, [verifyAsync.loading])


    const {loading, data, error, setLoading} = useLoginAsync({
        user: {
            username,
            password
        },
        defLoadState: false
    }) 

    useEffect(() => {
        if(loading === false){
            if(data !== null) {
                login(data.data)
                setItem("authToken", data.data.auth_token)
                navigate('/')
            } else if(error !== null) {
                setMessage("username/password is incorrect!")
            }
        }
    }, [loading])
   
    const handleSubmit = e => {
        e.preventDefault()
        setMessage("")

        if(isNotEmpty(username) && isNotEmpty(password)) {
            setLoading(true)
        } else {
            if(isNotEmpty(username)){
                setMessage("password is empty")
            } else if(isNotEmpty(password)) {
                setMessage("username is empty")
            } else{
                setMessage("username/password are empty")
            }
        } 
    }
    
    return (
        <Grid container justify="center" alignItems="center" style={{height: "100vh"}}>
            <Grid item>
                <Paper style={{overflow: "hidden"}}>
                {loading ? <LinearProgress disabled/> : null}
                <Grid container className={`${classes.px2} ${classes.py2}`}>
                    <Grid item xs={12} style={{textAlign: "center"}}>
                        <Typography variant="h6" color="primary">Admin Login</Typography>
                    </Grid>
                    <Grid item xs={12} className={`${classes.pt1}`}> 
                        {isNotEmpty(message) ? <Typography color="error" variant="caption">{message}</Typography>: null }
                        <form onSubmit={handleSubmit}>
                            <TextField className={`${classes.pb1}`} fullWidth label="Username" name="username" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                            <TextField fullWidth label="Password" name="password" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                            <div style={{textAlign: 'right'}}>
                                <Button variant="contained" color="primary" className={`${classes.mt2}`} onClick={handleSubmit}>Submit</Button>
                            </div>
                        </form>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    </Grid>
    )
}

export default Login