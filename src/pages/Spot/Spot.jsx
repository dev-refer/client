import React, { useState, useEffect } from 'react';

import { fade, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import SpotTable from '../../components/Table/SpotTable.jsx';
import AddButton from '../../components/button/addSpotButton.jsx';
import Loading from '../../components/Loading/index.js';
import swal from 'sweetalert2';
import axios from '../../libs/axios';
import { connect } from 'react-redux';
import { fetchSpot } from '../../redux/actions/spot.action';
import { setSpotDetail } from '../../redux/actions/spotDetail.action';





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
        marginLeft: 10,
        fontFamily: "HelveticaNeue-Bold"

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

function Spot(props) {
    const classes = useStyles();
    const { name } = props

    const [spotName, setSpotName] = useState(name || '')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        props.getSpot();
        props.getSpotDetail({ tes: '123' });
    }, [])


    const AddSpot = () => {
        props.history.push('/add-spot');
    }


    console.log(props, 'props di spot');
  
    
    

    // console.log(props.getSpot(), 'ini props');

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
                    <AddButton x={AddSpot} label="Add Spot +" />
                </Grid>
            </Grid>
            {
                props.spot.loading
                    ? <Loading />
                    : <SpotTable data={props.spot.spotList} edit={props.history} test={props.getSpotDetail} />
            }

        </div>
    );
}

const mapStateToProps = state => ({
    spot: state.spot,
    spotDetail: state
});

const mapDispatchToProps = dispatch => {
    return {
        getSpot: () => dispatch(fetchSpot({})),
        getSpotDetail: (data) => dispatch(setSpotDetail(data))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Spot);
