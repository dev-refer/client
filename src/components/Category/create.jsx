import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Input, InputLabel } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom'

import swal from 'sweetalert2'
import axios from '../../libs/axios'
import Loading from '../../components/Loading'


const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    outter: {
        width: '100%'
    }
}));

export default function SignUp() {
    const classes = useStyles();
    const [name, setName] = useState('')
    const [icon, setIcon] = useState('')
    const [loading, setLoading] = useState(false)
   
    const changeIcon = (e) => {
        setLoading(true)
        let data = new FormData()
        data.append('image', e.target.files[0])
        axios({
            method: 'POST',
            url: '/image/single',
            data
        })
            .then(data => {
                setLoading(false)
                setIcon(data.data.link)
            })
            .catch(err => {
                setLoading(false)
                swal.fire({
                    type: 'error',
                    text: 'Error while upload Icon'
                })
            })
    }
    const onSubmitCategory = () => {
        if (!icon || !name) {
            swal.fire({
                type: 'error',
                text: 'name and icon can not be empty'
            })
        }
        setLoading(true)
        axios({
            method: 'POST',
            data: {
                icon,
                name
            },
            headers: {
                token: localStorage.getItem('token')
            },
            url: '/v1/categories'
        })
            .then(data => {
                setLoading(false)
                swal.fire({
                    type: 'success',
                    text: 'success create category',
                    timer: 1500
                })
                setTimeout(() => window.location.href = '/dashboard/category', 2000);
            })
            .catch(err => {
                setLoading(false)
                swal.fire({
                    type: 'error',
                    title: 'error while create category',
                    text: err.message
                })
            })
    }
    return (
        
        <Container component="main" maxWidth="xs">
            <h2><Link to='/dashboard/category'><i className="fas fa-chevron-left" ></i></Link>  Create Category</h2>
            {loading ? <Loading classes={classes} /> : null}
            
            <CssBaseline />
            <div className={classes.paper}>
           
                <Typography component="h1" variant="h5">
                    Create Category
                </Typography>
                
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                onChange={(e) => { setName(e.target.value) }}
                                value={name}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Category Name"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <InputLabel htmlFor='img'>Upload Category Icon</InputLabel>
                            <Input onChange={changeIcon} id='img' type='file' />
                        </Grid>
                    </Grid>
                    <Button
                        onClick={onSubmitCategory}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Create
                    </Button>

                </form>
            </div>
        </Container>
    );
}