import React, {useState, useEffect} from 'react'
import 'common/css/theme.css'
import gql from 'graphql-tag'
import CardHeader from '@material-ui/core/CardHeader'
import { Grid, TextField, FormControl, Card,  CardContent, Typography, IconButton, CardActions, Icon, makeStyles, Select, MenuItem, InputLabel } from '@material-ui/core'
import { useStyles } from 'utils/preset_styles'
import ComponentCustom from 'components/ComponentCustom'

const cstyles = makeStyles((theme) => ({
    notfound: {
        color: theme.palette.grey[300],
        fontWeight: 500
    },
    fab: {
        position: "fixed",
        right: theme.spacing(2),
        bottom: theme.spacing(2)
    }
})) 

const GET_COMPLAINTS = gql`
query AllComplaints($options: InpOptions){
    allComplaints(options: $options) {
        _id
        complaint_message
        complaint_status
        create_date
    }
}
`

const UPDATE_COMPLAINT = gql`
mutation UpdateComplaint($id: ID!, $complaint: InpComplaint!) {
    updateComplaint(id: $id, complaint:  $complaint) {
        _id
        complaint_message
        complaint_status
        create_date
    }   
}
`

const DELETE_COMPLAINT = gql`
mutation DeleteComplaint($id: ID!) {
    deleteComplaint(id: $id){
        _id
    }
}
`

const ADD_COMPLAINT = gql`
mutation AddComplaint($complaint: InpComplaint!) {
    addComplaint(complaint: $complaint) {
        _id
        complaint_message
        complaint_status
        create_date
    }
}
`

const constfieldsNameList = [
    'complaint_message',
    'complaint_status'
]

const fieldNameMapping = {
    'complaint_message': {value: "Complaint Message", required: true},
    'complaint_status': {value: "Complaint Status", required: true},
}


const Complaints = () => {

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
                <Typography noWrap>ID: {item._id}</Typography>
                <Typography noWrap>{item.complaint_message}</Typography>
                <Typography noWrap>Status: <Typography component="span" color={
                    (item.complaint_status === "pending" ? 'inherit' : (item.complaint_status === 'inprogress' ? "primary" : "error") ) 
                }>{item.complaint_status}</Typography> </Typography>
                <Typography noWrap>Created On: {fdate}</Typography>
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
                update_query: UPDATE_COMPLAINT,
                error_message: "Error updating Complaint",
                success_message: "Updated Complaint!",
                update_var_unique: "id",
                update_var_info: "complaint"
            }}

            deleteObject={{
                delete_query: DELETE_COMPLAINT,
                delete_unique_var: "id",
                delete_unique_field: "id",
                error_message: "Error deleting Complaint",
                success_message: "Deleted Complaint!"
            }}

            queryObject={{
                query_query: GET_COMPLAINTS,
                query_unique_field: "_id",
                query_tablename: "allComplaints",
                forEachItem: renderHandler
            }}

            addObject={{
                add_query: ADD_COMPLAINT,
                error_message: "Error Adding Complaint",
                success_message: "Added Complaint",
                add_var_info: "complaint"
            }}  

            constfieldsNameList = {constfieldsNameList}
            fieldNameMapping={fieldNameMapping}

            editorRender = {(fields, onChange) => {

                console.log(fields)

                return (
                    <Grid item xs={12}>
                        <TextField multiline rowsMax={5} rows={5} label="Complaint Message" placeholder="Complaint Message" name="complaint_message" onChange={onChange} value={fields.complaint_message} fullWidth className={`${preset_styles.mb1}`} />
                        <FormControl fullWidth>
                        <InputLabel htmlFor="age-simple">Complaint Status</InputLabel>
                            <Select value={fields.complaint_status}
                            onChange={onChange} inputProps={{name: "complaint_status"}}>
                                <MenuItem value={"pending"}>Pending</MenuItem>
                                <MenuItem value={"inprogress"}>In Progress</MenuItem>
                                <MenuItem value={"resolved"}>Resolved</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                )
            }}
        />
    )
}

export default Complaints