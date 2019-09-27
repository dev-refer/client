import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Edit, Delete } from '@material-ui/icons'
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

export default function CategoryCard(props) {
    const {
        categoryData,
        deleteCategory,
        openEditModal,
        history,
        openBulkModal
    } = props
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container>
                    <div style={{ width: '100%', textAlign: 'end' }}>
                        <Edit
                            onClick={() => { openEditModal(categoryData.name, categoryData.icon, categoryData.description, categoryData.id) }}
                            style={{ cursor: 'pointer', maxHeight: '21px', color: '#fd6a02' }}
                        />
                    </div>
                    <Grid container spacing={2}>
                        <Grid style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }} item>
                            <img className={classes.img} alt={categoryData.name || 'Img Not Found'} src={categoryData.icon} />
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="h6">
                                        {categoryData.name}
                                    </Typography>
                                    <Typography style={{ fontSize: '12px' }} gutterBottom>
                                        {categoryData.description}
                                    </Typography>

                                </Grid>
                                <Grid item>
                                    <Fab onClick={()=>{openBulkModal(categoryData.id, categoryData.name)}} style={{ backgroundColor: '#707070', color: '#f2efef', maxHeight: '42px' }} variant="extended" aria-label="delete">
                                        Add Spot +
                                   </Fab>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                    <div style={{ width: '100%', textAlign: 'end' }}>
                        <Delete onClick={() => { deleteCategory(categoryData.id) }} style={{ cursor: 'pointer', maxHeight: '21px' }} />
                    </div>
                </Grid>
            </Paper>
        </div>
    );
}