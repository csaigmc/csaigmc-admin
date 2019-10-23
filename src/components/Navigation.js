import React, {useState} from 'react'
import {A, usePath, navigate} from 'hookrouter'
import 'common/css/theme.css'
import { LoadingBar } from 'utils/Loaders'
import { usePageLoadingContext, useLoginContext } from 'utils/context'
import { useLocalstorage } from 'utils/hooks/useLocalStorage'
import { AppBar, LinearProgress, Drawer, IconButton, Toolbar, Typography, Icon, List, ListItem, ListItemText, Collapse, ListSubheader, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    iconStyle: {
        color: theme.palette.common.white
    },
    title: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    }, 
    nested: {
        paddingLeft: theme.spacing(4)
    },
    dummyLoader: {
        background: theme.palette.primary.main
    }
})) 

const titles = {
    '/complaints': 'Complaints',
    '/students': 'Students',
    '/notifications': "Notifications",
    '/clubs/enigma': 'Enigma',
    '/clubs/isis': 'ISIS',
    '/clubs/memersclub': 'Memers Club',
    '/clubs/arts': 'Arts',
    '/members': "Members"
}

const getTitle = (string) => {
    const t = titles[string]
    if(typeof(t) === null) return "Unknown"
    else {
        return t
    }
}


export const Navigation = () => {

    const classes = useStyles()

    const path = usePath()
    const {loading} = usePageLoadingContext()
    const {logout} = useLoginContext()
    const {removeItem} = useLocalstorage()
    const [collapseIsOpen, setCollapseOpen] = useState(false)
    const [showingDrawer, setShowingDrawer] = useState(false)
    
    const handleLogout = () => {
        logout()
        removeItem("authToken")
        navigate('/')
    } 

    return (
    <header>
        <AppBar position="static">
            <Toolbar>
                <IconButton aria-label="drawer-toggle" onClick={() => setShowingDrawer(true)}>
                    <Icon className={classes.iconStyle}>menu</Icon>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    {getTitle(path)}
                </Typography>
            </Toolbar> 
            {loading ? <LinearProgress position="static"/> : <div className={classes.dummyLoader} style={{width: "100%", height: "4px"}}></div>}
        </AppBar> 
        <Drawer open={showingDrawer} onClose={() => setShowingDrawer(false)} >
            <List component='nav' aria-labelledby="menu" subheader={
                <ListSubheader  component="div" id="menu">
                    Menu
                </ListSubheader>
            } className={classes.root}>
                <Divider />
                <ListItem button href="/members" component={A} >
                    <ListItemText primary="Members" />
                </ListItem>
                <ListItem button href="/complaints" component={A} >
                    <ListItemText primary="Complaints" />
                </ListItem>
                <ListItem button href="/students" component={A}>
                    <ListItemText primary="Students"  />
                </ListItem>
                <ListItem button href="/notifications" component={A}>
                    <ListItemText primary="Notifications" />
                </ListItem>
                <ListItem button onClick={() => {
                    setCollapseOpen(!collapseIsOpen)
                }}>
                    <ListItemText primary="Clubs" />
                    <Icon>
                    {
                        collapseIsOpen ?
                        'expand_less' :
                        'expand_more'
                    }
                    </Icon>
                </ListItem>
                <Collapse in={collapseIsOpen} timeout="auto">
                    <List component="div" disablePadding>
                    <ListItem className={classes.nested} button href="/clubs/enigma" component={A}>
                        <ListItemText primary="Enigma" />
                    </ListItem>
                    <ListItem className={classes.nested} button href="/clubs/isis" component={A}>
                        <ListItemText  primary="ISIS" />
                    </ListItem>
                    <ListItem className={classes.nested} button href="/clubs/memersclub" component={A}>
                        <ListItemText primary="Memers Club" />
                    </ListItem>
                    <ListItem className={classes.nested} button href="/clubs/arts" component={A}>
                        <ListItemText primary="Arts" />
                    </ListItem>
                    </List>
                </Collapse>
                <Divider/>
                <ListItem button onClick={() => handleLogout()}>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </Drawer>
    </header>
    )
} 