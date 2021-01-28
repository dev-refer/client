import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { SearchOutlined, Delete } from '@material-ui/icons'
import { Fab } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: 10,
        marginRight: 10
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: '461px',
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

export default function HighlightCard(props) {
    const {
        highlightData,
        deleteHighlight,
        openModal
    } = props
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container>
                    {/* <div style={{ width: '100%', textAlign: 'end' }}>
                        <Edit
                            onClick={() => { openEditModal(highlightData.name, highlightData.icon, highlightData.description, highlightData.id) }}
                            style={{ cursor: 'pointer', maxHeight: '21px', color: '#fd6a02' }}
                        />
                    </div> */}
                    <Grid container spacing={2}>
                        <Grid style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }} item>
                            <img className={classes.img} alt={highlightData.name || 'Img Not Found'} src={highlightData.image || ''} />
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="h6">
                                        {highlightData.title}
                                    </Typography>
                                </Grid>

                            </Grid>

                        </Grid>
                    </Grid>
                    <div style={{ width: '100%', textAlign: 'end' }}>
                        <SearchOutlined onClick={() => { openModal(highlightData) }} style={{ cursor: 'pointer', maxHeight: '21px' }} />
                        <Delete onClick={() => { deleteHighlight(highlightData.id) }} style={{ cursor: 'pointer', maxHeight: '21px' }} />
                    </div>

                </Grid>
            </Paper>
        </div>
    );
}