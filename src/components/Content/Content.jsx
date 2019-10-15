import React from 'react';
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        height: '100%',
        minHeight: '100vh',
        backgroundColor: '#f2efef',
        paddingTop: theme.spacing(10),
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        paddingBottom: theme.spacing(5)
    },
    toolbar: theme.mixins.toolbar,
}))

export default function Content({ children }) {
    const classes = useStyles()
    return (
        <main className={classes.content}>
            <div className={classes.toolbar}>
                {children}
            </div>
        </main>
    );
}

