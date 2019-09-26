import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Maps from '../../components/maps/maps.jsx';
import OpenHours from '../../components/openHours/OpenHours.jsx';
import CategorySelect from '../../components/select/MultipleSelect.jsx';
import SaveButton from '../../components/button/SaveButton.jsx';
import DiscardButton from '../../components/button/DiscardButton.jsx';
import Typography from '@material-ui/core/Typography';

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


export default function AddSpot() {
    const classes = useStyles();
    const [values, setValues] = React.useState([]);

    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value });
        console.log(e.target.value);

    };



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
                        value={values.name}
                        onChange={handleChange('name')}
                        margin="normal"
                    />
                    <TextField
                        id="standard-name"
                        label="Phone"
                        className={classes.textField}
                        value={values.phone}
                        onChange={handleChange('phone')}
                        margin="normal"
                    />
                    <TextField
                        id="standard-name"
                        label="Email"
                        className={classes.textField}
                        value={values.email}
                        onChange={handleChange('email')}
                        margin="normal"
                    />
                    <TextField
                        id="standard-name"
                        label="City"
                        className={classes.textField}
                        value={values.city}
                        onChange={handleChange('city')}
                        margin="normal"
                    />
                    <TextField
                        id="standard-name"
                        label="Country"
                        className={classes.textField}
                        value={values.country}
                        onChange={handleChange('country')}
                        margin="normal"
                    />
                    <TextField
                        id="standard-multiline-static"
                        label="Address"
                        multiline
                        rows="4"
                        className={classes.textField}
                        margin="normal"
                    />
                    <TextField
                        id="standard-name"
                        label="Latitude"
                        className={classes.textField}
                        value={values.latitude}
                        onChange={handleChange('latitude')}
                        margin="normal"
                    />
                    <TextField
                        id="standard-name"
                        label="Longitude"
                        className={classes.textField}
                        value={values.longitude}
                        onChange={handleChange('longitude')}
                        margin="normal"
                    />
                    <br />
                    <div className={classes.maps}>
                        <Typography className={classes.title} variant="subtitle1" gutterBottom>
                            Maps
                        </Typography>
                        <Maps />
                    </div>
                    <br/>
                    <div className={classes.maps}>
                    <Typography className={classes.title} variant="subtitle1" gutterBottom>
                        Add Photo
                    </Typography>
                    </div>
                    <br />

                </Grid>
                <Grid container item direction="column" xs={6} className={classes.gridColumn}>
                    <TextField
                        id="standard-multiline-static"
                        label="Description"
                        multiline
                        rows="9"
                        className={classes.textField}
                        margin="normal"
                    />
                    <br />
                    <Typography className={classes.title} variant="subtitle1" gutterBottom>
                        Open Hours
                    </Typography>
                    <OpenHours />
                    <br />
                    <CategorySelect />
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