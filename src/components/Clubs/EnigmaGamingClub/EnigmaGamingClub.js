import React, { Fragment } from 'react'
import { ComponentCustom } from 'components/ComponentCustom'
import gql from 'graphql-tag'
import CardHeader from '@material-ui/core/CardHeader'
import { Grid, FormControl, InputLabel, Select, MenuItem, TextField, Card,  CardContent, Typography, IconButton, CardActions, Icon, Link, makeStyles, Button, DialogTitle, DialogContent } from '@material-ui/core'
import { useStyles } from 'utils/preset_styles'
import { fontSize, fontFamily } from '@material-ui/system'
import ReactMarkdown from 'react-markdown'


const GET_ENIGMA = gql`
query AllEnigmas($options: InpOptions){
    allArticles(options: $options) {
        _id
        author
        about_author
        text
        title
        article_type
        create_date
    }
}
`

const UPDATE_ENIGMA = gql`
mutation UpdateEnigma($id: ID!, $article: InpArticle) {
    updateArticle(id: $id, article:  $article) {
        _id
        author
        about_author
        text
        title
        article_type
        create_date
    }   
}
`

const DELETE_ENIGMA = gql`
mutation DeleteEnigma($id: ID!) {
    deleteArticle(id: $id){
        _id
    }
}
`

const ADD_ENIGMA = gql`
mutation AddEnigma($article: InpArticle!) {
    addArticle(article: $article) {
        _id
        text
        title
        author
        about_author
        article_type
        create_date
    }
}
`
const constfieldsNameList = [
    'text',
    'article_type',
    'title',
    'author',
    'about_author'
]

const fieldNameMapping = {
    'text': {value: "Text", required: true},
    'title': {value: "Title", required: true},
    'article_type': {value: "Article Type", required: true},
    'author': {value: "Author", required: true},
    'about_author': {value: "About Author", required: true}
}

const cStyles = makeStyles(() => ({
    editor: {
        fontFamily: "IBM Plex Mono, ubuntu mono, consolas, source code pro, monospace !important"
    }
}))

const EnigmaGamingClub = () => {

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
                <Typography variant="body1" noWrap>By: {item.author}</Typography>
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
                update_query: UPDATE_ENIGMA,
                error_message: "Error Upadting Article",
                success_message: "Updated Article!",
                update_var_unique: "id",
                update_var_info: "article"
            }}

            deleteObject={{
                delete_query: DELETE_ENIGMA,
                delete_unique_var: "id",
                delete_unique_field: "_id",
                error_message: "Error deleting Article",
                success_message: "Deleted Article!"
            }}

            queryObject={{
                query_query: GET_ENIGMA,
                query_unique_field: "_id",
                query_tablename: "allArticles",
                forEachItem: renderHandler,
                query_params: {
                    type: "enigma"
                }
            }}

            addObject={{
                add_query: ADD_ENIGMA,
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
                                    <Typography>Output</Typography>
                                    <Typography>
                                        <ReactMarkdown source={fields['text']} />
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField margin="normal" noWrap fullWidth label="Author" required name={`author`} value={fields["author"]} onChange={onChange} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField margin="normal" noWrap fullWidth label="About Author" required name={`about_author`} value={fields["about_author"]} onChange={onChange} />
                                </Grid>
                                <FormControl fullWidth>
                                <InputLabel htmlFor="age-simple">Type</InputLabel>
                                    <Select value={fields.article_type}
                                    onChange={onChange} inputProps={{name: "article_type"}}>
                                        <MenuItem value={"enigma"}>Enigma</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>        
                    ) 
            }}
        />
    )
}

export default EnigmaGamingClub