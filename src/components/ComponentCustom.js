import React, {useState, useEffect} from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import 'common/css/theme.css'
import { usePageLoadingContext } from 'utils/context'
import { LoadText } from 'utils/Loaders'
import { ErrorText } from 'utils/ErrorText'
import InfiniteScroll from 'react-infinite-scroll-component'

import { Grid, Card,  CardContent, Typography, IconButton, CardActions, Icon, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Snackbar, makeStyles, Fab } from '@material-ui/core'
import { useStyles } from 'utils/preset_styles'
import { fontWeight } from '@material-ui/system'
import { Editor } from 'components/Editors'
import { __DEV__ } from 'cconfig'

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

export const ComponentCustom = ({
    updateObject,
    deleteObject,
    queryObject,
    addObject,
    constfieldsNameList,
    fieldNameMapping,
    editorRender,
    fullScreen,
    dialogRender
}) => {

    const LIMIT = 12

    const {setLoading} = usePageLoadingContext()
    const [editData, setEditData] = useState(null)
    const [showEditor, setShowEditor] = useState(false)
    const [showingSnackBar, setShowingSnackbar] = useState(false)
    const [message, setMessage] = useState("Dummy Message")
    const [shouldShowSnackbar, setShouldShowSnackbar] = useState(false)
    const [showExpanded, setShowExpanded] = useState(-1)
    const [hasMore, setHasMore] = useState(true)

    const {loading, data, error, fetchMore} = useQuery(queryObject.query_query, {
        variables: {
            options: {
                skip: 0,
                limit: LIMIT,
                ...queryObject.query_params
            }
        }
    })
    
    const [updateDetails, sup] = useMutation(updateObject.update_query)
    const [deleteDetails, delNews] = useMutation(deleteObject.delete_query, {
        update(cache, data) {

            // const queryData = cache.readQuery({
            //     query: queryObject.query_query,
            //     variables: {
            //         skip: 0,
            //         limit: LIMIT,
            //         ...queryObject.query_params
            //     }   
            // })

            console.log("___DELETE___")
            console.log(data)
            // console.log(queryData)

            // cache.writeQuery({
            //     query: queryObject
            // })
        }
    })
    const [addDetails, addNews] = useMutation(addObject.add_query, {
        update(cache, data) {

            // const queryData = cache.readQuery({
            //     query: queryObject.query_query,
            //     variables: {
            //         skip: 0,
            //         limit: LIMIT,
            //         ...queryObject.query_params
            //     }   
            // })

            console.log("___ADD___")
            console.log(data)
            // console.log(queryData)

        }
    })

    const preset_styles = useStyles()
    const classes = cstyles()
    const pg = usePageLoadingContext()


    if(__DEV__){
        console.log("...Component Custom..")
        console.log(data)
        console.log(".....")
    }


    useEffect(() => {
        if(loading === true) {
            setLoading(true)
        } else if(loading === false) {
            setLoading(false)
            if(!data || data[queryObject.query_tablename].length < LIMIT) {
                setHasMore(false)
            } 
        }
    }, [loading])

    useEffect(() => {
        if(sup && sup.loading === false && shouldShowSnackbar === true) {
            setMessage(sup.error ? updateObject.error_message : updateObject.success_message)
            setShowingSnackbar(true)
            setLoading(false)
        }
    }, [sup.loading])

    useEffect(() => {

        if(addNews && addNews.loading === false && shouldShowSnackbar === true) {
            setMessage(addNews.error ? addObject.error_message : addObject.success_message)
            setShowingSnackbar(true)
            setLoading(false)
        }
    }, [addNews.loading])

    useEffect(() => {

        if(delNews && delNews.loading === false && shouldShowSnackbar === true) {
            setMessage(delNews.error ? deleteObject.error_message : deleteObject.success_message)
            setShowingSnackbar(true)
            setLoading(false)
        }
    }, [delNews.loading])

    let ToRender

    console.log(data)

    if(loading === true) {
        ToRender = <LoadText />
    }
    else if(typeof(data) !== 'undefined' && data) {
        if(data[queryObject.query_tablename].length === 0) {
            ToRender = (
                <Grid container justify="center">
                    <Grid item>
                        <Typography variant="h2" className={classes.notfound}>{queryObject.null_found}</Typography>
                    </Grid>
                </Grid>
            )
        } else {
            const items = data[queryObject.query_tablename].map(
                (item, itemIndex) => queryObject.forEachItem(
                    item, 
                    itemIndex,
                    () => {
                            setEditData(itemIndex)
                            setShowEditor(true)
                        },
                    () => {
                        if(__DEV__){
                            console.log(".........")
                            console.log(item)
                            console.log(deleteObject.delete_unique_field)
                            console.log(deleteObject.delete_unique_var)
                            console.log(item[deleteObject.delete_unique_field])
                            console.log("..........")
                        }
                        deleteDetails({variables: {[deleteObject.delete_unique_var]: item[deleteObject.delete_unique_field]}})
                        setShouldShowSnackbar(true)
                    }, 
                    setShowExpanded
                )
            )
            const renderData = []
            for(let i = 0; i < data[queryObject.query_tablename].length; i+=4){
                const cItems = []
                for(let j = i; j < i + 4; ++j) {
                    cItems.push(items[j])
                }
                renderData.push(
                <Grid container>
                    {cItems}
                </Grid>
                )
            } 
            if(__DEV__){
                console.log("xxxx")
                console.log(items)
                console.log("xxxx")
            }
            ToRender = (
                    <InfiniteScroll
                    hasMore={hasMore}
                    loader={<div>Loading More Items...</div>}
                    endMessage={<div>Loaded All!</div>}
                    next={() => {
                        const res = data[queryObject.query_tablename].length / LIMIT
                        console.log(`SKIP: ${res} | ${Math.floor(res)}`)
                        return fetchMore({
                        variables: {
                            options: {
                                skip: res,
                                limit: LIMIT,
                                ...queryObject.query_params
                            }
                        }, updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult || !hasMore) return prev;
                            console.log(prev)
                            console.log(queryObject)
                            console.log(fetchMoreResult)
                            if(fetchMoreResult[queryObject.query_tablename].length < LIMIT) {
                                setHasMore(false)
                            }
                            return {
                                [queryObject.query_tablename]: [
                                    ...prev[queryObject.query_tablename],
                                    ...fetchMoreResult[queryObject.query_tablename]
                                ]
                            }
                        }
                    })}}>
                        
                    {renderData}
                    </InfiniteScroll>
            )
                       
        }
    } else {
        ToRender = <ErrorText errorText={queryObject.null_found ? queryObject.null_found : "Nothing Found :/"}/>
    }

    if(__DEV__) {
        console.log(ToRender)
    }

    return (
        <Grid container className={preset_styles.py2} >
            <Snackbar 
                anchorOrigin={{vertical: 'top', horizontal: "right"}}
                open={showingSnackBar}
                autoHideDuration={3000}
                message={message}
                onClose={() => {
                    setShowingSnackbar(false)
                }}
            />
            <Editor
                fullScreen={fullScreen ? true : false}
                renderer={editorRender}
                isShowing={showEditor} 
                constfieldsNameList={constfieldsNameList}
                fieldNameMapping={fieldNameMapping}
                editdata={editData !== null && data && data[queryObject.query_tablename] ? data[queryObject.query_tablename][editData] : null}
                onClose={() => {
                    if(editData !== -1){
                        setEditData(-1);
                    }
                    setShowEditor(false)
                }}
                onSave={(newInfo) => {

                    if(__DEV__){
                        console.log("____ON SAVE BEGIN____")
                        console.log(newInfo)
                        console.log("____ON SAVE END____")
                    }

                    if(editData !== null) {
                        const unqiue_field = data[queryObject.query_tablename][editData][queryObject.query_unique_field]
                        setShowEditor(false)
                        pg.setLoading(true)

                        updateDetails({variables: {
                            [updateObject.update_var_unique]: unqiue_field,
                            [updateObject.update_var_info]: newInfo
                        }})
                        setShouldShowSnackbar(true)
                    } else {
                        setShowEditor(false)
                        pg.setLoading(true)

                        addDetails({
                            variables: {
                                [addObject.add_var_info]: newInfo
                            }
                        })
                        setShouldShowSnackbar(true)
                    }
                }}/>
            <Grid item xs={12}>
                {ToRender}
            </Grid>
            <Fab className={classes.fab} color="secondary" onClick={() => {
                setEditData(null)
                setShowEditor(true)
            }}>
                <Icon>
                    add
                </Icon>
            </Fab>
            <Dialog onClose={() => setShowExpanded(-1)} color="secondary" open={showExpanded !== -1 && showExpanded >= 0}>
                {dialogRender && showExpanded !== -1 && showExpanded >= 0 && data && data[queryObject.query_tablename] ? dialogRender(data[queryObject.query_tablename][showExpanded]) : null}
            </Dialog>
        </Grid>
    )
}

export default ComponentCustom