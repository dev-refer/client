import React, { useState, useEffect } from 'react';
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from '../../libs/axios';
import swal from 'sweetalert2';
import Loading from '../../components/Loading';

import { connect } from 'react-redux';
import { login } from '../../redux/actions/auth.action';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit">
                Refer
      </Link>{' '}
            {new Date().getFullYear()}
        </Typography>
    );
}

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
        margin: 10,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function SignIn({ history, postLogin }) {
    useEffect(() => {
        if (localStorage.getItem('token')) {
            history.replace('/')
        }
    })
    const classes = useStyles();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const submitLogin = async (e) => {
        e.preventDefault()
        if (!email || !password) {
            return swal.fire({
                title: "Please fill empty field",
                type: 'error',
            })
        }
        setLoading(true)
        postLogin(email, password)
        try {
            const result = await axios({
                method: 'POST',
                url: '/v1/users/admin/login',
                data: {
                    email,
                    password
                }
            })
            if (!result.token) {
                postLogin({
                    token: '',
                    data: result.data,
                    isLogin: false,
                    error: false
                })
                setLoading(false)
                return swal.fire({
                    title: "Authentication fail",
                    text: "wrong username/password",
                    type: 'error',
                })
            }
            localStorage.setItem('token', result.token)
            localStorage.setItem('userName', result.data.name)
            postLogin({
                token: result.token,
                data: result.data,
                isLogin: true,
                error: false
            })
            setLoading(false)
            swal.fire({
                type: 'success',
                title: `Success Login, welcome ${result.data.name}`,
                showConfirmButton: false,
                timer: 1500
            })
            setTimeout(() => {
                history.replace('/');
            }, 1600);
        } catch (error) {
            postLogin({
                token: null,
                data: null,
                isLogin: false,
                error: true
            })
        }

    }
    return (
        <Container component="main" maxWidth="xs">
            {
                loading ? <Loading classes={classes} /> : null
            }
            <CssBaseline />
            <div className={classes.paper}>
                {/* <Avatar alt="Remy Sharp" src="https://storage.cloud.google.com/asset_refer_production/refer_logo.jpeg" className={classes.avatar} /> */}
                <Typography component="h1" variant="h5">
                    Sign in
        </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type='submit'
                        onClick={submitLogin}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
          </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
              </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

const mapStateToProps = state => ({
    isLogin: state.user
});

const mapDispatchToProps = dispatch => {
    return {
        postLogin: (data) => dispatch(login(data))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);

