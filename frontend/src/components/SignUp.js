import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import {SIGN_UP_WINDOW_NAME} from "./Constants";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import axios from 'axios';
import * as Constants from './Constants'
import {getCookie} from './Utils';
import {LoadingDialog, AlertDialog} from './molecules/dialogs/Dialogs'


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
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
}));

/**
 * @return {null}
 */
function SignUp(props) {

    if (props.currentComponentName !== SIGN_UP_WINDOW_NAME) {
        return null;
    }
    const [openLoadingDialog, setOpenLoadingDialog] = useState(false);


    //region AlertDialog
    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const [alertDialogTitle, setAlertDialogTitle] = useState("");
    const [alertDialogContentText, setAlertDialogContentText] = useState("");
    const [alertDialogContentTextList, setAlertDialogContentTextList] = useState([]);
    //endregion

    const classes = useStyles();
    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required(),
    });
    const {register, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = data => {

        setOpenLoadingDialog(true);

        axios({
            method: 'post',
            url: Constants.URL_USER_CREATE,
            data: {
                username: data.email,
                first_name: data.firstName,
                last_name: data.lastName,
                email: data.email
            },
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            }
        }).then(response => {
            console.log('response', response);

        }).catch(function (error) {
            console.log(error.response);

            setOpenLoadingDialog(false);

            setAlertDialogTitle("Error creating new user");
            setAlertDialogContentText("");
            setAlertDialogContentTextList(error.response.data.errors);
            setOpenAlertDialog(true);
        });
    };

    const onCloseLoadingDialog = () => {
        console.log('onCloseLoadingDialog');
    };
    const onCloseAlertDialog = () => {
        console.log('onCloseAlertDialog');

        setAlertDialogTitle("");
        setAlertDialogContentText("");
        setOpenAlertDialog(false);
    };

    return <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="text"
                            autoComplete="fname"
                            name="firstName"
                            variant="outlined"
                            fullWidth
                            id="firstName"
                            label="First Name"
                            inputRef={register}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="text"
                            autoComplete="lname"
                            name="lastName"
                            variant="outlined"
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            inputRef={register}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="text"
                            name="email"
                            variant="outlined"
                            fullWidth
                            id="email"
                            label="Email Address"
                            autoComplete="email"
                            inputRef={register}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="password"
                            name="password"
                            variant="outlined"
                            fullWidth
                            id="password"
                            label="Password"
                            autoComplete="current-password"
                            inputRef={register}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                    </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    Sign Up
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link href="#" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </div>
        <Box mt={5}>
            <Copyright/>
        </Box>
        <LoadingDialog
            dialogContentText={Constants.MESSAGE_CREATING_NEW_USER}
            onClose={onCloseLoadingDialog}
            open={openLoadingDialog}
            dialogTitle={""}
        />
        <AlertDialog
            dialogTitle={alertDialogTitle}
            dialogContentText={alertDialogContentText}
            onClose={onCloseAlertDialog}
            open={openAlertDialog}
            dialogContentTextList={alertDialogContentTextList}/>
    </Container>
}

export default SignUp;