import React from 'react'
import { ComponentCustom } from 'components/ComponentCustom'
import gql from 'graphql-tag'
import CardHeader from '@material-ui/core/CardHeader'
import { Grid, TextField, Card,  CardContent, Typography, IconButton, CardActions, Icon, Link, makeStyles } from '@material-ui/core'
import { useStyles } from 'utils/preset_styles'
import { fontSize } from '@material-ui/system'


const GET_NOTIFICATIONS = gql`
query AllNotifications($options: InpOptions){
    allNotifications(options: $options) {
        _id
        notification_text
        notification_url
        create_date
    }
}
`

const UPDATE_NOTIFICATION = gql`
mutation UpdateNotification($id: ID!, $notification: InpNotification) {
    updateNotification(id: $id, notification:  $notification) {
        _id
        notification_text
        notification_url
        create_date
    }   
}
`

const DELETE_NOTIFICATION = gql`
mutation DeleteNotification($id: ID!) {
    deleteNotification(id: $id){
        _id
    }
}
`

const ADD_NOTIFICATION = gql`
mutation AddNotification($notification: InpNotification!) {
    addNotification(notification: $notification) {
        _id
        notification_text
        notification_url
        create_date
    }
}
`
const constfieldsNameList = [
    'notification_text',
    'notification_url'
]

const fieldNameMapping = {
    'notification_text': {value: "Text", required: true},
    'notification_url': {value: "URL", required: true}
}

const Papers = () => {

    const preset_styles = useStyles()


    const renderHandler = (item, itemIndex, onClickEdit, onClickDelete) => {

        const date = new Date()
        date.setTime(item.create_date)
        const day = date.getUTCDate()
        const mon = date.getMonth() + 1
        const year = date.getFullYear()
        const fdate = `${mon}/${day}/${year}`
    
        return (
        <Grid key={itemIndex} item xs={12} sm={6} md={4} lg={3} classname={`${preset_styles.mx2} ${preset_styles.my2}`}>
            <Card>
            <CardContent>
                <Typography variant="h6" noWrap>Link: <Link target="_blank" rel="noopener" href={item.notification_url}>{item.notification_text}</Link></Typography>
                <Typography>Created On: {fdate}</Typography>
            </CardContent>
            <CardActions disableSpacing>
                    <IconButton onClick={onClickEdit}>
                        <Icon>edit</Icon>
                    </IconButton>
                    <IconButton onClick={onClickDelete}>
                        <Icon>delete</Icon>
                    </IconButton>
            </CardActions>
            </Card>
        </Grid>)
    }
    
    return (
        <ComponentCustom 
            updateObject={{
                update_query: UPDATE_NOTIFICATION,
                error_message: "Error Upadting Notification",
                success_message: "Updated Notification!",
                update_var_unique: "id",
                update_var_info: "notification"
            }}

            deleteObject={{
                delete_query: DELETE_NOTIFICATION,
                delete_unique_var: "id",
                delete_unique_field: "_id",
                error_message: "Error deleting Notification",
                success_message: "Deleted Notification!"
            }}

            queryObject={{
                query_query: GET_NOTIFICATIONS,
                query_unique_field: "_id",
                query_tablename: "allNotifications",
                forEachItem: renderHandler,
                query_params: {
                    type: "paper"
                }
            }}

            addObject={{
                add_query: ADD_NOTIFICATION,
                error_message: "Error Adding Notification",
                success_message: "Added Notification",
                add_var_info: "notification"
            }}

            constfieldsNameList = {constfieldsNameList}
            fieldNameMapping={fieldNameMapping}

            editorRender = {(fields, onChange) => {
                return constfieldsNameList.map((item, index) => {
                    const fvalues = fieldNameMapping[item]
                    return (
                        <Grid item xs={12}>
                            <TextField margin="normal" noWrap fullWidth label={`${fvalues.value}`} required={fvalues.required} name={`${item}`} value={fields[item]} onChange={onChange} />
                        </Grid>        
                        )
                    })
            }}
        />
    )
}

export default Papers