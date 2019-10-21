import React, {useState, useEffect} from 'react'
import CardHeader from '@material-ui/core/CardHeader'
import { Grid, Card,  CardContent, Typography, IconButton, CardActions, Icon, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Snackbar, makeStyles, Fab } from '@material-ui/core'
import { useStyles } from 'utils/preset_styles'
import { fontWeight } from '@material-ui/system'
import { __DEV__ } from 'cconfig'

const extractor = (editdata, constfieldsNameList) => {
    const result = {}
    constfieldsNameList.map(
        (item, index) => {
            result[item] = (editdata && editdata[item]) || ""
        }
    )
    return result
}

export const Editor = ({fullScreen, renderer, isShowing, editdata, constfieldsNameList, fieldNameMapping, onSave, onClose}) => {
    const [fields, setfields] = useState(extractor(editdata, constfieldsNameList))

    useEffect(() => {
        setfields(extractor(editdata, constfieldsNameList))
    }, [isShowing])

    const onChange = (e) => {
        setfields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }

    if(__DEV__) {
        console.log("----------EDITOR BEGIN-------------")
        console.log(isShowing)
        console.log(editdata)
        console.log(constfieldsNameList)
        console.log(fieldNameMapping)
        console.log("----------EDITOR END-------------")
    }

    const ToRender = renderer(fields, onChange)
    console.log(ToRender)

    return (
        <Dialog fullScreen={fullScreen} open={isShowing} onClose={() => onClose()} aria-labelledby="student-data-edit">
            <DialogTitle>Edit Details </DialogTitle>
            <DialogContent>
                <Grid container>
                    {ToRender}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose()} >Cancel</Button>
                <Button color="primary" onClick={() => onSave(fields)}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}