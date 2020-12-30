import React, {useContext, useState} from 'react';
import {useForm} from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import {SIGN_UP_WINDOW_NAME, TITLE_ALERT_DIALOG_ERROR_CREATING_NEW_USER_TITLE} from "../../Constants";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import * as Constants from '../../Constants'
import {LoadingDialog, AlertDialog} from '../../molecules/dialogs/Dialogs'
import {requestCreateUser} from './SignUpUtils'
import {getAccessTokenLocalStorage, requestAccessToken, saveAccessTokenLocalStorage, saveUserLocalStorage} from "../../Utils";
import 'regenerator-runtime/runtime'
import {AppContext} from "../../app-context";
import Copyright from "../../molecules/typography/Typography"

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
export default function (props) {
    const [state, dispatch] = useContext(AppContext);

    console.log('SignUp.state.currentPage', state.currentPage);

    const [openLoadingDialog, setOpenLoadingDialog] = useState(false);

    //region AlertDialog states
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

    const handleCreateUserError = error => {
        setAlertDialogTitle(TITLE_ALERT_DIALOG_ERROR_CREATING_NEW_USER_TITLE);
        setAlertDialogContentText("");
        setAlertDialogContentTextList(error.response.data.errors);
        setOpenAlertDialog(true);
    };
    const handleRequestAccessTokenError = error => {
        //TODO
    };

    const onClickGuessUser = (event) => {
        event.preventDefault();
        dispatch({
            type: Constants.APP_CONTEXT_ACTION_SET_CURRENT_PAGE,
            payload: Constants.HOME_WINDOW_NAME
        });
    };

    const onSubmit = async dataForm => {

        setOpenLoadingDialog(true);

        const responseCreateUser = await requestCreateUser(dataForm)
            .then(responseCreateUser => {
                console.log('requestLogIn.responseCreateUser', responseCreateUser);

                saveUserLocalStorage(responseCreateUser);

                setOpenLoadingDialog(false);
                return responseCreateUser;
            }).catch(function (error) {
                console.log('requestLogIn.catch.error', error.response);
                setOpenLoadingDialog(false);
                handleCreateUserError(error);
                return null;
            });

        console.log('responseCreateUser', responseCreateUser);

        if (!!responseCreateUser) {
            const responseAccessToken = await requestAccessToken(dataForm)
                .then(responseAccessToken => {
                    console.log('requestAccessToken.responseAccessToken', responseAccessToken);

                    saveAccessTokenLocalStorage(responseAccessToken.data);
                    const accessToken = getAccessTokenLocalStorage();
                    console.log('accessToken', accessToken);

                    return responseAccessToken;
                }).catch(function (error) {
                    console.log('requestAccessToken.catch.error', error.response);
                    handleRequestAccessTokenError(error);
                    return null;
                });

            if (!!responseAccessToken) {
                const {access_token} = responseAccessToken.data;
                dispatch({
                    type: Constants.APP_CONTEXT_ACTION_SET_TOKEN,
                    payload: access_token
                });
                dispatch({
                    type: Constants.APP_CONTEXT_ACTION_SET_IS_LOGGED_IN,
                    payload: true
                });
                dispatch({
                    type: Constants.APP_CONTEXT_ACTION_SET_CURRENT_PAGE,
                    payload: Constants.HOME_WINDOW_NAME
                });
            }
        }
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

    const onClickLogInLink = (event) => {
        event.preventDefault();
        dispatch({
            type: Constants.APP_CONTEXT_ACTION_SET_CURRENT_PAGE,
            payload: Constants.LOG_IN_WINDOW_NAME
        });
    };

    return (state.currentPage === SIGN_UP_WINDOW_NAME &&
        <Container component="main" maxWidth="xs">
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
                            <Link onClick={onClickLogInLink} href="#" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link onClick={onClickGuessUser} href="#" variant="body2">
                                Use guess user
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright appName={Constants.APP_TITLE_NAME}/>
            </Box>
            <LoadingDialog
                dialogContentText={Constants.MESSAGE_CREATING_NEW_USER}
                onClose={onCloseLoadingDialog}
                open={openLoadingDialog}
                dialogTitle={Constants.TITLE_LOADING_DIALOG}
            />
            <AlertDialog
                dialogTitle={alertDialogTitle}
                dialogContentText={alertDialogContentText}
                onClose={onCloseAlertDialog}
                open={openAlertDialog}
                dialogContentTextList={alertDialogContentTextList}/>
        </Container>
    )
}