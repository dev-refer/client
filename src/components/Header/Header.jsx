import React from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Badge,
    makeStyles,
    CssBaseline
} from '@material-ui/core';

import NotificationsIcon from '@material-ui/icons/Notifications';
import {
    ArrowDropDown,
    Mail
} from '@material-ui/icons';

import MenuIcon from '@material-ui/icons/Menu'

import clsx from 'clsx';

import { connect } from 'react-redux';
import { setDrawerOptions } from '../../redux/actions/currentpage.action';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    fixedHeight: {
        height: 240,
    },
    iconButtonStyle: {
        marginRight: 15
    },
    textStyle: {
        marginRight: 15,
        marginLeft:2
    }
}))

function Header({ currentPage, handleDrawer, router }) {
    const classes = useStyles();
    const open = currentPage.drawerOptions
    const handleDrawerOpen = () => {
        handleDrawer(true)
    };
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar color='inherit' position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>

                    </Typography>
                    <IconButton className={classes.iconButtonStyle} color="inherit">
                        {/* <Badge badgeContent={4} color="secondary"> */}
                            <Mail />
                        {/* </Badge> */}
                    </IconButton>
                    <IconButton className={classes.iconButtonStyle} color="inherit">
                        {/* <Badge badgeContent={4} color="secondary"> */}
                            <NotificationsIcon />
                        {/* </Badge> */}
                    </IconButton>
                    <Typography className={classes.textStyle} component="h1" variant="h6" color="inherit" noWrap>
                       Hello {localStorage.getItem('userName')}
                    </Typography>
                    <IconButton color="inherit">
                        <ArrowDropDown />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>

    )
}

const mapStateToProps = state => ({
    currentPage: state.currentPage,
    router: state.router
});

const mapDispatchToProps = dispatch => {
    return {
        handleDrawer: (options) => dispatch(setDrawerOptions(options))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);