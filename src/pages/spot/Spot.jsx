import React, {useState, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SpotTable from '../../components/table/SpotTable.jsx';
import AddButton from '../../components/button/addSpotButton.jsx';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';



const useStyles = makeStyles(theme => ({
    root: {
        // backgroundColor: 'white'
    },
    cont: {
        float: 'left',
        backgroundColor: 'pink',
    },
    pageTitle: {
        // float: 'left',
        // backgroundColor: 'white',
        padding: 10,
        marginLeft: 10

    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
        margin: 0
    },
    searchBar: {
        marginLeft: 20
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      input: {
        margin: theme.spacing(1),
      },
      button: {
        alignSelf: 'flex-end'
    },
    space: {
        margin: 15
    }


}));

export default function Spot() {
    const classes = useStyles();

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function getSpotData(){}
    })



    return (
        <div className={classes.root}>
            <h1 className={classes.pageTitle}>Spot</h1>
            <Grid container spacing={3} className={classes.space}>
                <Grid item xs={2}>
                    <div className={classes.container}>
                        <TextField
                            id="standard-search"
                            label="Search"
                            type="search"
                            className={classes.textField}
                            margin="normal"
                        />
                    </div>
                </Grid>
                <Grid item xs={2} className={classes.button}>
                    <AddButton />
                </Grid>
            </Grid>
            <SpotTable />

        </div>
    );
}
