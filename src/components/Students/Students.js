import React, {useState, useEffect} from 'react'
import 'common/css/theme.css'
import gql from 'graphql-tag'
import CardHeader from '@material-ui/core/CardHeader'
import { Grid, TextField, Card,  CardContent, Typography, IconButton, CardActions, Icon, makeStyles } from '@material-ui/core'
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

const GET_STUDENTS = gql`
query allStudents($options: InpOptions){
    allStudents(options: $options) {
        _id
        roll_no
        first_name
        last_name
        country_code
        phone_no
        father_name
        mother_name
        create_date
    }
}
`

const UPDATE_STUDENT = gql`
mutation UpdateStudent($id: ID!, $student: InpStudent!) {
    updateStudent(id: $id, student:  $student) {
        _id
        roll_no
        first_name
        last_name
        country_code
        phone_no
        father_name
        mother_name
        create_date
    }   
}
`

const DELETE_STUDENT = gql`
mutation DeleteStudent($roll_no: ID!) {
    deleteStudent(roll_no: $roll_no){
        _id
    }
}
`

const ADD_STUDENT = gql`
mutation AddStudent($student: InpStudent!) {
    addStudent(student: $student) {
        _id
        roll_no
        first_name
        last_name
        country_code
        phone_no
        father_name
        mother_name
        create_date
    }
}
`

const constfieldsNameList = [
    'roll_no',
    'first_name',
    'last_name',
    'country_code',
    "phone_no",
    'father_name',
    'mother_name'
]

const fieldNameMapping = {
    'roll_no': {value: "Roll no", required: true},
    'first_name': {value: "First Name", required: false},
    'last_name': {value: "Last Name", required: false},
    'country_code': {value: "Country Code", required: false},
    "phone_no": {value: "Phone No", required: false},
    'father_name': {value: "Father Name", required: false},
    'mother_name': {value: "Mother Name", required: false}
}


const Students = () => {

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
            <CardHeader
                disableTypography
                title={
                    <Typography variant="h6" noWrap={true}>
                        {item.first_name} {item.last_name}
                    </Typography>
                }
                subheader={<Typography variant="subtitle2">{item.roll_no}</Typography>} />
            <CardContent>
                <Typography>Father's Name: {item.father_name}</Typography>
                <Typography>Mother's Name: {item.mother_name}</Typography>
                <Typography>Contact Details: {item.country_code !== "" ? `+${item.country_code}`: ""} {item.phone_no}</Typography>
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
                update_query: UPDATE_STUDENT,
                error_message: "Error student Notification",
                success_message: "Updated Student!",
                update_var_unique: "id",
                update_var_info: "student"
            }}

            deleteObject={{
                delete_query: DELETE_STUDENT,
                delete_unique_var: "roll_no",
                delete_unique_field: "roll_no",
                error_message: "Error deleting Student",
                success_message: "Deleted Student!"
            }}

            queryObject={{
                query_query: GET_STUDENTS,
                query_unique_field: "_id",
                query_tablename: "allStudents",
                forEachItem: renderHandler
            }}

            addObject={{
                add_query: ADD_STUDENT,
                error_message: "Error Adding Student",
                success_message: "Added Student",
                add_var_info: "student"
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

export default Students