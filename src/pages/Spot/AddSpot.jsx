import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Maps from '../../components/Maps/maps.jsx';
import OpenHours from '../../components/OpenHours/OpenHours.jsx';
import CategorySelect from '../../components/Select/MultipleSelect.jsx';
import SaveButton from '../../components/button/SaveButton.jsx';
import DiscardButton from '../../components/button/DiscardButton.jsx';
import Typography from '@material-ui/core/Typography';
import { Button, Tooltip } from '@material-ui/core';
import { Add } from '@material-ui/icons'
import { connect } from 'react-redux';
import { fetchCategory } from '../../redux/actions/category.action';

import swal from 'sweetalert2';
import axios from '../../libs/axios';

const useStyles = makeStyles(theme => ({
    root: {
        // backgroundColor: '#f2efef'
    },
    pageTitle: {
        padding: 20,
        margin: 0
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        border: 1
    },
    gridColumn: {
        padding: 20
    },
    title: {
        color: 'grey'
    },
    maps: {
        margin: 8
    }
}));


function AddSpot(props) {

    useEffect(() => {
        props.getCategory()
    }, [])

    const classes = useStyles();
    const { photo, photo1, photo2 } = props
    const [values, setValues] = useState([]);
    const [spotName, setSpotName] = useState('')
    const [spotPhone, setSpotPhone] = useState('')
    const [spotEmail, setSpotEmail] = useState('')
    const [spotCity, setSpotCity] = useState('')
    const [spotCountry, setSpotCountry] = useState('')
    const [spotAddress, setSpotAddress] = useState('')
    const [spotLatitude, setSpotLatitude] = useState('')
    const [spotLongitude, setSpotLongitude] = useState('')
    const [spotDescription, setSpotDescription] = useState('')
    const [spotPhoto, setSpotPhoto] = useState([])
    // const [spotPhoto1, setSpotPhoto1] = useState(photo1 || '')
    // const [spotPhoto2, setSpotPhoto2] = useState(photo2 || '')
    const [category, setCategory] = useState([])

    const [loading, setLoading] = useState(false)

    // const handleChange = name => e => {
    //     setValues({ ...values, [name]: e.target.value });
    //     // console.log(e.target.value);

    // };



    const callBackFunction = (selectedCategoryData) => {
        setCategory(selectedCategoryData)
    }
    // console.log(values, 'state');


    const changePhoto = async (e) => {
        const data = new FormData()
        data.append('image', e.target.files[0])

        try {
            setLoading(true)
            const result = await axios({
                method: 'POST',
                url: '/image/single',
                data,
                header: {
                    token: localStorage.getItem('token')
                }
            })
            const arr = [
                ...spotPhoto,
                result.data.link
            ]
            console.log(arr);

            setSpotPhoto(arr)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            swal.fire({
                title: 'error while upload file',
                text: 'Please Try Again Later, Or call CS on 082242747182',
                type: 'error'
            })

        }
    }

    // console.log(spotPhoto, 'state nya spotPhoto');
    // console.log(category, 'state category');
    // useEffect((e) => {
    //     console.log(e.target.value);

    // })


    return (

        <div className={classes.root}>
            <CssBaseline />
            <h1 className={classes.pageTitle}>Spot Information</h1>
            <Grid container>
                <Grid container item direction="column" xs={6} className={classes.gridColumn}>
                    <TextField
                        id="standard-name"
                        label="Name"
                        className={classes.textField}
                        value={spotName}
                        onChange={(e) => { setSpotName(e.target.value) }}
                        margin="normal"
                    />
                    <TextField
                        id="standard-name"
                        label="Phone"
                        className={classes.textField}
                        value={spotPhone}
                        onChange={(e) => { setSpotPhone(e.target.value) }}
                        margin="normal"
                    />
                    <TextField
                        id="standard-name"
                        label="Email"
                        className={classes.textField}
                        value={spotEmail}
                        onChange={(e) => { setSpotEmail(e.target.value) }}
                        margin="normal"
                    />
                    <TextField
                        id="standard-name"
                        label="City"
                        className={classes.textField}
                        value={spotCity}
                        onChange={(e) => { setSpotCity(e.target.value) }}
                        margin="normal"
                    />
                    <TextField
                        id="standard-name"
                        label="Country"
                        className={classes.textField}
                        value={spotCountry}
                        onChange={(e) => { setSpotCountry(e.target.value) }}
                        margin="normal"
                    />
                    <TextField
                        id="standard-multiline-static"
                        label="Address"
                        multiline
                        rows="4"
                        className={classes.textField}
                        value={spotAddress}
                        onChange={(e) => { setSpotAddress(e.target.value) }}
                        margin="normal"
                    />
                    <TextField
                        id="standard-name"
                        label="Latitude"
                        className={classes.textField}
                        value={spotLatitude}
                        onChange={(e) => { setSpotLatitude(e.target.value) }}
                        margin="normal"
                    />
                    <TextField
                        id="standard-name"
                        label="Longitude"
                        className={classes.textField}
                        value={spotLongitude}
                        onChange={(e) => { setSpotLongitude(e.target.value) }}
                        margin="normal"
                    />
                    <br />
                    <div className={classes.maps}>
                        <Typography className={classes.title} variant="subtitle1" gutterBottom>
                            Maps
                        </Typography>
                        <Maps lat={values.latitude} long={values.longitude} />
                    </div>
                    <br />
                    <div className={classes.maps}>
                        <Typography className={classes.title} variant="subtitle1" gutterBottom>
                            Add Photo
                        </Typography>
                        {
                            spotPhoto.length !== 0
                                ?
                                <div>
                                    {
                                        spotPhoto.map((val) => {
                                            return(
                                            <Tooltip placement='top' title='Delete'>
                                                <Button onClick={() => { setSpotPhoto('') }}>
                                                    <img style={{ maxHeight: '100px', maxWidth: '100px' }} src={val} alt="" />
                                                </Button>
                                            </Tooltip>
                                            )
                                        })
                                    }

                                </div>
                                : null
                        }
                        {
                            spotPhoto.length <= 5
                                ? <label htmlFor="outlined-button-file">
                                    <Button style={{ height: '100px', width: '100px' }} variant="outlined" component="span" className={classes.button}>
                                        <Add />
                                    </Button>
                                </label>
                                : null
                        }

                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="outlined-button-file"
                            value=''
                            type="file"
                            onChange={(e) => { changePhoto(e) }}
                        />

                    </div>
                    <br />

                </Grid>
                <Grid container item direction="column" xs={6} className={classes.gridColumn}>
                    <TextField
                        id="standard-multiline-static"
                        label="Description"
                        multiline
                        rows="7"
                        className={classes.textField}
                        margin="normal"
                        value={spotDescription}
                        onChange={(e) => { setSpotDescription(e.target.value) }}
                    />
                    <br />
                    <Typography className={classes.title} variant="subtitle1" gutterBottom>
                        Open Hours
                    </Typography>
                    <OpenHours />
                    <br />
                    <CategorySelect
                        categoryCallBack={callBackFunction}
                    />
                </Grid>
            </Grid>
            <Grid container className={classes.gridColumn}>
                <DiscardButton
                    containerElement='label' // <-- Just add me!
                    label='My Label'>
                    <input type="file" />
                    >
                </DiscardButton>
                &nbsp;
                &nbsp;
                &nbsp;
                <SaveButton />

            </Grid>


        </div>
    )
}

const mapStateToProps = state => ({
    categories: state.category

});

const mapDispatchToProps = dispatch => {
    return {
        getCategory: () => dispatch(fetchCategory({}))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddSpot);
