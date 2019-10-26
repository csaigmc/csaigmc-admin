import React, { Fragment } from 'react'
import { ComponentCustom } from 'components/ComponentCustom'
import gql from 'graphql-tag'
import CardHeader from '@material-ui/core/CardHeader'
import { Grid, FormControl, InputLabel, Select, MenuItem, TextField, Card,  CardContent, Typography, IconButton, CardActions, Icon, Link, makeStyles, Button, DialogTitle, DialogContent, CardMedia } from '@material-ui/core'
import { useStyles } from 'utils/preset_styles'
import { fontSize, fontFamily } from '@material-ui/system'
import ReactMarkdown from 'react-markdown'


const GET_ARTS = gql`
query AllArts($options: InpOptions){
    allArts(options: $options) {
        _id
        creator
        about_creator
        url_path
        art_format
        art_type
        create_date
    }
}
`

const UPDATE_ART = gql`
mutation UpdateArts($id: ID!, $art: InpArt) {
    updateArt(id: $id, art:  $art) {
        _id
        creator
        about_creator
        url_path
        art_type
        art_format
        create_date
    }   
}
`

const DELETE_ART = gql`
mutation DeleteArt($id: ID!) {
    deleteArt(id: $id){
        _id
    }
}
`

const ADD_ART = gql`
mutation AddArt($art: InpArt!) {
    addArt(art: $art) {
        _id
        creator
        about_creator
        url_path
        art_type
        art_format
        create_date
    }
}
`
const constfieldsNameList = [
    'creator',
    'about_creator',
    'url_path',
    'art_type',
    'art_format'
]

const fieldNameMapping = {
    'creator': {value: "Creator", required: true},
    'about_creator': {value: "About Creator", required: true},
    'url_path': {value: "URL path", required: true},
    "art_format": {value: "Format", required: true}
}

const cStyles = makeStyles(() => ({
    editor: {
        fontFamily: "IBM Plex Mono, ubuntu mono, consolas, source code pro, monospace !important"
    }
}))

const Gallery = () => {

    const preset_styles = useStyles()
    const cstyles = cStyles()


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
                    title={item.creator}
                    subheader={item.about_creator}
                />
            <CardContent>
                <Typography variant="overline">Preview</Typography>
                {
                    item.art_type === 'image' ?
                    <img style={{width: "100%", maxHeight: "360px"}} src={item.url_path} /> :
                    <iframe style={{maxHeight: "360px", width: "100%"}} src={item.url_path}>
                    </iframe>
                }
                <Typography>{item.creator}</Typography>
                <Typography variant="subtitle1">{item.about_creator}</Typography>
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
                update_query: UPDATE_ART,
                error_message: "Error Upadting Art",
                success_message: "Updated Art!",
                update_var_unique: "id",
                update_var_info: "art"
            }}

            deleteObject={{
                delete_query: DELETE_ART,
                delete_unique_var: "id",
                delete_unique_field: "_id",
                error_message: "Error deleting Art",
                success_message: "Deleted Art!"
            }}

            queryObject={{
                query_query: GET_ARTS,
                query_unique_field: "_id",
                query_tablename: "allArts",
                forEachItem: renderHandler,
                query_params: {
                    type: "teacher"
                }
            }}

            addObject={{
                add_query: ADD_ART,
                error_message: "Error Adding Article",
                success_message: "Added Article",
                add_var_info: "art"
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
                                    <TextField margin="normal" noWrap fullWidth label="Creator" required name={`creator`} value={fields["creator"]} onChange={onChange} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField margin="normal" noWrap fullWidth label="About Creator" required name={`about_creator`} value={fields["about_creator"]} onChange={onChange} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField margin="normal" noWrap fullWidth label="URL" required name={`url_path`} value={fields["url_path"]} onChange={onChange} />
                                </Grid>
                                <FormControl fullWidth>
                                <InputLabel>Format</InputLabel>
                                    <Select value={fields.art_format}
                                    onChange={onChange} inputProps={{name: "art_format"}}>
                                        <MenuItem value={"image"}>Image</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                <InputLabel>Type</InputLabel>
                                    <Select value={fields.art_type}
                                    onChange={onChange} inputProps={{name: "art_type"}}>
                                        <MenuItem value={"teacher"}>Advisory</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>        
                    ) 
            }}
        />
    )
}

export default Gallery