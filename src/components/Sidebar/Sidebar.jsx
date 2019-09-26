import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import {
    Drawer,
    List,
    Divider,
    IconButton,
    makeStyles,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core';
import { Link } from 'react-router-dom'

import SpotIcon from '@material-ui/icons/LocationOn';
import CategoryIcon from '@material-ui/icons/List';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {
    BarChart,
    People
} from '@material-ui/icons'
import { connect } from 'react-redux';
import { setDrawerOptions } from '../../redux/actions/currentpage.action';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        backgroundColor: '#fd6a02',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    iconList: {
        color: 'white'
    },
    activeButton: {
        backgroundColor: 'white',
        "&:hover": {
            backgroundColor: 'white'
        }
    },
    activeIcon: {
        color: 'black'
    }
}))

function Sidebar(props) {
    const { currentPage, handleDrawer, router } = props
    const classes = useStyles()
    const handleDrawerClose = () => {
        handleDrawer(false)
    };
    const open = currentPage.drawerOptions
    const { pathname } = router.location

    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
        >
            <div className={classes.toolbarIcon}>
                <h4>
                    Dashboard
                </h4>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List style={{ backgroundColor: '#484848', color: 'white', minHeight: '80vh', height: '100%' }}>
                <div>
                    <Link style={{ color: 'inherit', textDecoration: "none" }} to='/'>
                        <ListItem className={pathname === '/' ? classes.activeButton : null} button >
                            <ListItemIcon>
                                <BarChart className={pathname === '/' ? classes.activeIcon : classes.iconList} />
                            </ListItemIcon>
                            <ListItemText className={pathname === '/' ? classes.activeIcon : classes.iconList} primary="Dashboard" />
                        </ListItem>
                    </Link>
                    <Link style={{ color: 'inherit', textDecoration: "none" }} to='/spot'>
                        <ListItem className={pathname === '/spot' ? classes.activeButton : null} button>
                            <ListItemIcon>
                                <SpotIcon className={pathname === '/spot' ? classes.activeIcon : classes.iconList} />
                            </ListItemIcon>
                            <ListItemText className={pathname === '/spot' ? classes.activeIcon : classes.iconList} primary="Spot" />
                        </ListItem>
                    </Link>
                    <Link style={{ color: 'inherit', textDecoration: "none" }} to='/categories'>
                        <ListItem className={pathname === '/categories' ? classes.activeButton : null} button>
                            <ListItemIcon>
                                <CategoryIcon className={pathname === '/categories' ? classes.activeIcon : classes.iconList} />
                            </ListItemIcon>
                            <ListItemText className={pathname === '/categories' ? classes.activeIcon : classes.iconList} primary="Category" />
                        </ListItem>
                    </Link>
                    <Link style={{ color: 'inherit', textDecoration: "none" }} to='/user'>
                        <ListItem className={pathname === '/user' ? classes.activeButton : null} button>
                            <ListItemIcon>
                                <People className={pathname === '/user' ? classes.activeIcon : classes.iconList} />
                            </ListItemIcon>
                            <ListItemText className={pathname === '/user' ? classes.activeIcon : classes.iconList} primary="Users" />
                        </ListItem>
                    </Link>
                </div>
            </List>
        </Drawer>
    )
}

const mapStateToProps = state => ({
    currentPage: state.currentPage,
    router: state.router,
    state

});

const mapDispatchToProps = dispatch => {
    return {
        handleDrawer: (options) => dispatch(setDrawerOptions(options))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sidebar);


