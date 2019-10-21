import React, { Fragment } from 'react'
import { ComponentCustom } from 'components/ComponentCustom'
import gql from 'graphql-tag'
import CardHeader from '@material-ui/core/CardHeader'
import ReactMarkdown from 'react-markdown'
import { Grid, FormControl, InputLabel, Select, MenuItem, TextField, Card,  CardContent, Typography, IconButton, CardActions, Icon, Link, makeStyles, Button, DialogTitle, DialogContent } from '@material-ui/core'
import { useStyles } from 'utils/preset_styles'
import { fontSize, fontFamily } from '@material-ui/system'


const GET_ISIS = gql`
query AllArticles($options: InpOptions){
    allArticles(options: $options) {
        _id
        text
        title
        article_type
        create_date
    }
}
`

const UPDATE_ISIS = gql`
mutation UpdateArticle($id: ID!, $article: InpArticle) {
    updateArticle(id: $id, article: $article) {
        _id
        text
        title
        article_type
        create_date
    }   
}
`

const DELETE_ISIS = gql`
mutation DeleteArticle($id: ID!) {
    deleteArticle(id: $id){
        _id
    }
}
`

const ADD_ISIS = gql`
mutation AddArticle($article: InpArticle!) {
    addArticle(article: $article) {
        _id
        text
        title
        article_type
        create_date
    }
}
`
const constfieldsNameList = [
    'text',
    'article_type',
    'title'
]

const fieldNameMapping = {
    'text': {value: "Text", required: true},
    'title': {value: "Title", required: true},
    'article_type': {value: "Article Type", required: true}
}

const cStyles = makeStyles(() => ({
    editor: {
        fontFamily: "IBM Plex Mono, ubuntu mono, consolas, source code pro, monospace !important"
    }
}))

const PoetsAndWriters = () => {

    const preset_styles = useStyles()
    const cstyles = cStyles()


    const renderHandler = (item, itemIndex, onClickEdit, onClickDelete, setShowExpanded) => {

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
                <Typography variant="h6" noWrap>{item.title}</Typography>
                <Typography>Created On: {fdate}</Typography>
            </CardContent>
            <CardActions disableSpacing>
                    <IconButton onClick={onClickEdit}>
                        <Icon>edit</Icon>
                    </IconButton>
                    <IconButton onClick={onClickDelete}>
                        <Icon>delete</Icon>
                    </IconButton>
                    <Button color="primary" onClick={() => setShowExpanded(itemIndex)}>More</Button>
            </CardActions>
            </Card>
        </Grid>)
    }
    
    return (
        <ComponentCustom 
            updateObject={{
                update_query: UPDATE_ISIS,
                error_message: "Error Upadting Article",
                success_message: "Updated Article!",
                update_var_unique: "id",
                update_var_info: "article"
            }}

            deleteObject={{
                delete_query: DELETE_ISIS,
                delete_unique_var: "id",
                delete_unique_field: "_id",
                error_message: "Error deleting Article",
                success_message: "Deleted Article!"
            }}

            queryObject={{
                query_query: GET_ISIS,
                query_unique_field: "_id",
                query_tablename: "allArticles",
                forEachItem: renderHandler,
                query_params: {
                    type: "isis"
                }
            }}

            addObject={{
                add_query: ADD_ISIS,
                error_message: "Error Adding Article",
                success_message: "Added Article",
                add_var_info: "article"
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
            fullScreen={true}

            editorRender = {(fields, onChange) => {
                return (
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <TextField margin="normal" noWrap fullWidth label="Title" required name={`title`} value={fields["title"]} onChange={onChange} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField className={`${cstyles.editor}`} margin="normal" rows={10} maxRows={10} noWrap fullWidth label="Text" multiline required name={`text`} value={fields["text"]} onChange={onChange} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputLabel>Output</InputLabel>
                                       <Typography>
                                        <ReactMarkdown source={fields['text']}/>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                    <InputLabel htmlFor="age-simple">Type</InputLabel>
                                        <Select value={fields.article_type}
                                        onChange={onChange} inputProps={{name: "article_type"}}>
                                            <MenuItem value={"isis"}>ISIS</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>        
                    ) 
            }}
        />
    )
}

export default PoetsAndWriters