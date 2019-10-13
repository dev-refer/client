import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SpotTable from '../../components/table/SpotTable.jsx';
import AddButton from '../../components/button/addSpotButton.jsx';
import Loading from '../../components/Loading/index.js';
import Pagination from 'material-ui-flat-pagination'
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

    const [total, setTotal] = useState()
    const [number, setNumber] = useState()
    const [limit, setDisplay] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        props.getSpot({ order: 'DESC', sort: 'id', pages: 1 });
        props.getSpotDetail({ tes: '123' });
    }, [])


    const AddSpot = () => {
        props.history.push('/add-spot');
    }

    const deleteSpot = async (id) => {
        const confirm = await swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
        if (confirm.value) {
            const options = {
                url: '/v1/spots/' + id,
                headers: {
                    token: localStorage.getItem('token')
                },
                method: 'DELETE'
            }
            try {
                setLoading(true)
                await axios(options)
                await props.getSpot({ order: 'DESC', sort: 'id', pages: 1 })
                await props.getSpotDetail()
                setLoading(false)
                swal.fire(
                    'Delete',
                    'Success Delete Spot',
                    'success'
                )
            } catch (error) {
                console.log(error);
                setLoading(false)
                swal.fire(
                    'Error',
                    'error while deleting spot, please try again later',
                    'error'
                )
            }
        }
    }

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
                    ? <Loading /> :
                    <div>
                        <SpotTable data={props.spot.spotList} edit={props.history} spotDetail={props.getSpotDetail} deleteSpot={deleteSpot} />
                        <Pagination
                            total={Math.ceil(props.spot.count / props.spot.limit)}
                            offset={number}
                            onClick={(e, offset) => {
                                props.getSpot({ order: 'DESC', sort: 'id', pages: offset + 1 })
                                setNumber(offset);
                            }}
                        />
                    </div>
            }

        </div>
    );
}

const mapStateToProps = state => ({
    spot: state.spot
});

const mapDispatchToProps = dispatch => {
    return {
        getSpot: (data) => dispatch(fetchSpot(data)),
        getSpotDetail: (data) => dispatch(setSpotDetail(data))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Spot);