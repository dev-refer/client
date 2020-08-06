import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Maps from '../../components/Maps/Maps.jsx';
import OpenHours from '../../components/openHours/OpenHours.jsx';
import CategorySelect from '../../components/select/MultipleSelect.jsx';
import SaveButton from '../../components/button/SaveButton.jsx';
import DiscardButton from '../../components/button/DiscardButton.jsx';
import Typography from '@material-ui/core/Typography';
import { Button, Tooltip, Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import Loading from '../../components/Loading/index.js';

import { setSpotDetail } from '../../redux/actions/spotDetail.action';
import { connect } from 'react-redux';
import { fetchSpot } from '../../redux/actions/spot.action';

// import Loading from '../Loading';
import swal from 'sweetalert2';
import axios from '../../libs/axios';
import { fetchSpotById } from '../../redux/actions/spot.action.js';

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


function EditSpot(props) {
    const classes = useStyles();
    const { name, photo } = props
    const [values, setValues] = React.useState([]);
    const [state, setState] = useState({});
    const [spotName, setSpotName] = useState('');
    const [spotPhone, setSpotPhone] = useState('');
    const [spotEmail, setSpotEmail] = useState('');
    const [spotCity, setSpotCity] = useState('');
    const [spotCountry, setSpotCountry] = useState('');
    const [spotAddress, setSpotAddress] = useState('');
    const [spotLatitude, setSpotLatitude] = useState('');
    const [spotRegion, setSpotRegion] = useState('');
    const [spotLongitude, setSpotLongitude] = useState('');
    const [spotDescription, setSpotDescription] = useState('');
    const [categoryName, setCategoryName] = useState([]);
    const [openHours, setOpenHours] = useState([])

    const [spotPhoto, setSpotPhoto] = useState(photo || '')
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        // JIKA SPOT DETAIL DI PROPS TIDAK ADA
        //LAKUKAN GET SPOT ID
        // JIKA ADA
        //SET SPOT DETIAL DI STATE MENGGUNAKAN PROPS SPOTDETAIL

        console.log(props);


        if (!props.spotDetail.spotDetail.name) {
            console.log('masuk')
            // props.getSpotId(props.match.params.id)
        }
        // setSpotPhoto(icon)

    }, [])

    useEffect(() => {
        setSpotName(props.spotDetail.spotDetail.name)
        setSpotPhone(props.spotDetail.spotDetail.phone)
        setSpotEmail(props.spotDetail.spotDetail.email)
        setSpotCity(props.spotDetail.spotDetail.city)
        setSpotCountry(props.spotDetail.spotDetail.country)
        setSpotAddress(props.spotDetail.spotDetail.address)
        setSpotLatitude(props.spotDetail.spotDetail.latitude)
        setSpotLongitude(props.spotDetail.spotDetail.longitude)
        setSpotDescription(props.spotDetail.spotDetail.description)
        setSpotRegion(props.spotDetail.spotDetail.region)
        let images =[]
        props.spotDetail.spotDetail.images && props.spotDetail.spotDetail.images.forEach(value => {
            images.push(value.link)
        })
        setSpotPhoto(images)
        console.log(props.spotDetail.spotDetail, 'ini spot detail')
    }, [])

    const callBackFunction = (selectedCategoryData) => {
        setCategoryName(selectedCategoryData)
    }

    const validateTimes = () => {
        let arr = Object.entries(openHours)
        let data = []
        if (arr.length === 0) {
            return false
        }
        for (let i = 0; i < arr.length; i++) {
            if (typeof arr[i][1] !== 'string') {
                if (!arr[i][1].Open || !arr[i][1].Close) {
                    return false
                }
                data.push(arr[i])
            }
        }
        return data
    }

    const callOpenHours = (selectedOpenHours) => {
        setOpenHours(selectedOpenHours)
    }

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
    // console.log(props.spotDetail.spotDetail.name, 'ini props di editspot');
    // console.log(props, 'prpos edit');

    const deletePhoto = (data) => {
        const newPhoto = spotPhoto.filter(val => {
            return val !== data
        })
        setSpotPhoto(newPhoto)
    }

    const submitUpdate = async() => {
        const operatingTimes = validateTimes();
        if (operatingTimes) {
            var categoryId = [];
            categoryName.map(cat => {
                let c = props.categories.categoryList.find(item => item.name == cat)
                categoryId.push(c.id);
            })

            try {
                setLoading(true)
                await axios({
                    method: 'POST',
                    url: '/v1/spots',
                    data: {
                        name: spotName,
                        description: spotDescription,
                        phone: spotPhone,
                        latitude: spotLatitude,
                        longitude: spotLongitude,
                        city: spotCity,
                        address: spotAddress,
                        operatingTimes: operatingTimes,
                        categoryId: categoryId,
                        image: spotPhoto,
                        country: spotCountry,
                        region: spotRegion
                    },
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                setLoading(false)
                swal.fire({
                    title: 'success',
                    text: 'New spot successfully added',
                    type: 'success'
                })
                props.getSpot()
                window.location.replace('/spot')

            } catch (error) {
                setLoading(false)
                swal.fire({
                    title: 'error while upload file',
                    text: 'Please Try Again Later, Or call CS on 082242747182',
                    type: 'error'
                })
            }
        }
    }
    return (
        //KETIKA SPOTDETAIL PROPS ADA TAMPILKAN SPOT DETAIL
        // KETIKA SPOTDETAIL GA ADA TAMPILKAN LOADING => GET SPOTDETAIL DULU
        // KETIKA HASI AKHIR SPOT DETAIL GA ADA< TAMPILKAN ERROR MESSAGE SPOT DETAIL GA KETEMEU
        <div className={classes.root}>
            <CssBaseline />
            {
                loading
                ?<Loading/>
                :null
            }
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
                        rows="3"
                        className={classes.textField}
                        margin="normal"
                        value={spotAddress}
                        onChange={(e) => { setSpotAddress(e.target.value) }}

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
                        <Maps setLat={setSpotLatitude} setLong={setSpotLongitude} lat={spotLatitude} long={spotLongitude} />
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
                                            return (
                                                <Tooltip placement='top' title='Delete'>
                                                    <Button onClick={() => { deletePhoto(val) }}>
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
                    <OpenHours OpenHoursCallBack={callOpenHours} />
                    <br />
                    {/* <CategorySelect /> */}
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
                </DiscardButton>
                &nbsp;
                &nbsp;
                &nbsp;
                <SaveButton submit={()=>{alert('asd')}} />
            </Grid>
        </div>
    )
}

const mapStateToProps = state => ({
    spot: state.spot,
    spotDetail: state.spotData
});

const mapDispatchToProps = dispatch => {
    return {
        getSpot: () => dispatch(fetchSpot({})),
        getSpotDetail: (data) => dispatch(setSpotDetail(data)),
        getSpotId: (spotId) => dispatch(fetchSpotById(spotId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditSpot);
