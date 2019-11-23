import React, { Fragment } from 'react'
import { ComponentCustom } from 'components/ComponentCustom'
import gql from 'graphql-tag'
import CardHeader from '@material-ui/core/CardHeader'
import { Grid, FormControl, InputLabel, Select, MenuItem, TextField, Card,  CardContent, Typography, IconButton, CardActions, Icon, Link, makeStyles, Button, DialogTitle, DialogContent, CardMedia } from '@material-ui/core'
import { useStyles } from 'utils/preset_styles'
import { fontSize, fontFamily } from '@material-ui/system'
import ReactMarkdown from 'react-markdown'


const GET_USERS = gql`
query AllUsers($options: InpOptions){
    allUsers(options: $options) {
        _id
        user
        about_user
        url_path
        user_type
        phone_no
        email
        create_date
    }
}
`

const UPDATE_USER = gql`
mutation UpdateUsers($id: ID!, $user: InpUser) {
    updateUser(id: $id, user:  $user) {
        _id
        user
        about_user
        url_path
        user_type
        phone_no
        email
        create_date
    }   
}
`

const DELETE_USER = gql`
mutation DeleteUser($id: ID!) {
    deleteUser(id: $id){
        _id
    }
}
`

const ADD_USER = gql`
mutation AddUser($user: InpUser!) {
    addUser(user: $user) {
        _id
        user
        about_user
        url_path
        user_type
        phone_no
        email
        create_date
    }
}
`
const constfieldsNameList = [
    'user',
    'about_user',
    'url_path',
    'user_type',
    'phone_no',
    'email'
]

const fieldNameMapping = {
    'user': {value: "Creator", required: true},
    'about_user': {value: "About Creator", required: true},
    'url_path': {value: "URL path", required: true},
    'user_type': {value: "User Type", required: true},
    "phone_no": {value: "Phone", required: true},
    'email': {value: "Email", required: true}
}

const cStyles = makeStyles(() => ({
    editor: {
        fontFamily: "IBM Plex Mono, ubuntu mono, consolas, source code pro, monospace !important"
    }
}))

const Members = () => {

    const preset_styles = useStyles()

    const renderHandler = (item, itemIndex, onClickEdit, onClickDelete) => {

        const date = new Date()
        date.setTime(item.create_date)
        const day = date.getUTCDate()
        const mon = date.getMonth() + 1
        const year = date.getFullYear()
        const fdate = `${mon}/${day}/${year}`
    
        return (
        <Grid key={itemIndex} item xs={12} sm={6} lg={3} classname={`${preset_styles.mx2} ${preset_styles.my2}`}>
            <Card>
                <CardHeader 
                    disableTypography
                    title={
                        <Typography variant="h6" noWrap={true}>
                            {item.user}
                        </Typography>
                    }
                    subheader={
                        <>
                            <Typography noWrap variant="subtitle2">{item.about_user}</Typography>
                            <Typography noWrap variant="subtitle2">{item.phone_no}</Typography>
                            <Typography noWrap variant="subtitle2">{item.email}</Typography>
                        </>
                    } 
                />
            <CardContent>
                <Typography variant="overline">Preview</Typography>
                {<img style={{width: "100%", height: "180px", objectFit: "cover"}} src={item.url_path} />}
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
                update_query: UPDATE_USER,
                error_message: "Error Upadting User",
                success_message: "Updated User!",
                update_var_unique: "id",
                update_var_info: "user"
            }}

            deleteObject={{
                delete_query: DELETE_USER,
                delete_unique_var: "id",
                delete_unique_field: "_id",
                error_message: "Error deleting User",
                success_message: "Deleted User!"
            }}

            queryObject={{
                query_query: GET_USERS,
                query_unique_field: "_id",
                query_tablename: "allUsers",
                forEachItem: renderHandler,
                query_params: {
                    type: "student"
                }
            }}

            addObject={{
                add_query: ADD_USER,
                error_message: "Error Adding User",
                success_message: "Added User",
                add_var_info: "user"
            }}

            constfieldsNameList = {constfieldsNameList}
            fieldNameMapping={fieldNameMapping}

            dialogRender={
                (item) => {
                    return (
                        <Fragment>
                            <DialogTitle>
                                {item.title}
                            </DialogTitle>
                            <DialogContent dividers>
                                {item.text}
                            </DialogContent>
                        </Fragment>
                    ) 
                }
            }

            editorRender = {(fields, onChange) => {

                console.log(fields)

                return (
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <TextField margin="normal" noWrap fullWidth label="User" required name={`user`} value={fields["user"]} onChange={onChange} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField margin="normal" noWrap fullWidth label="About User" required name={`about_user`} value={fields["about_user"]} onChange={onChange} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField margin="normal" noWrap fullWidth label="URL" required name={`url_path`} value={fields["url_path"]} onChange={onChange} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField margin="normal" noWrap fullWidth label="Phone no" name={`phone_no`} value={fields["phone_no"]} onChange={onChange} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField margin="normal" noWrap fullWidth label="Email" name={`email`} value={fields["email"]} onChange={onChange} />
                                </Grid>
                                <FormControl fullWidth>
                                <InputLabel>Type</InputLabel>
                                    <Select value={fields['user_type']}
                                    onChange={onChange} inputProps={{name: "user_type"}}>
                                        <MenuItem value={"student"}>Student</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>        
                    ) 
            }}
        />
    )
}

export default Members