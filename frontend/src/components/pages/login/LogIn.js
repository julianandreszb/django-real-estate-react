import React, {useContext, useState} from 'react';
import {useForm} from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import {LOG_IN_WINDOW_NAME, TITLE_ALERT_DIALOG_ERROR_CREATING_NEW_USER_TITLE} from "../../Constants";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import * as Constants from '../../Constants'
import {LoadingDialog, AlertDialog} from '../../molecules/dialogs/Dialogs'
import {requestLogIn} from './LogInUtils'
import {
    getAccessTokenLocalStorage,
    requestAccessToken,
    saveAccessTokenLocalStorage,
    saveUserLocalStorage
} from "../../Utils";
import 'regenerator-runtime/runtime'
import {AppContext} from "../../app-context";
import Copyright from "../../molecules/typography/Typography";

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

    console.log('LogIn.state.currentPage', state.currentPage);

    const [openLoadingDialog, setOpenLoadingDialog] = useState(false);

    //region AlertDialog states
    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const [alertDialogTitle, setAlertDialogTitle] = useState("");
    const [alertDialogContentText, setAlertDialogContentText] = useState("");
    const [alertDialogContentTextList, setAlertDialogContentTextList] = useState([]);
    //endregion

    const classes = useStyles();
    const schema = yup.object().shape({
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

    const onSubmit = async dataForm => {

        setOpenLoadingDialog(true);

        const responseLogInUser = await requestLogIn(dataForm)
            .then(responseLogIn => {
                console.log('requestLogIn.responseLogIn', responseLogIn);

                saveUserLocalStorage(responseLogIn);

                setOpenLoadingDialog(false);
                return responseLogIn;
            }).catch(function (error) {
                console.log('requestLogIn.catch.error', error.response);
                setOpenLoadingDialog(false);
                handleCreateUserError(error);
                return null;
            });

        console.log('responseLogInUser', responseLogInUser);

        if (!!responseLogInUser && !!responseLogInUser.data) {

            let accessToken;

            if (typeof responseLogInUser.data.access_token !== 'undefined' &&
                typeof responseLogInUser.data.refresh_token !== 'undefined') {

                saveAccessTokenLocalStorage(responseLogInUser.data);
                accessToken = getAccessTokenLocalStorage();
            } else {

                accessToken = await requestAccessToken(dataForm)
                    .then(responseAccessToken => {
                        console.log('requestAccessToken.responseAccessToken', responseAccessToken);

                        saveAccessTokenLocalStorage(responseAccessToken.data);
                        const accessToken = getAccessTokenLocalStorage();
                        console.log('accessToken', accessToken);

                        // return responseAccessToken;
                        return accessToken;
                    }).catch(function (error) {
                        console.log('requestAccessToken.catch.error', error.response);
                        handleRequestAccessTokenError(error);
                        return null;
                    });
            }

            console.log('LogIn.js.accessToken', accessToken);

            if (!!accessToken) {
                dispatch({
                    type: Constants.APP_CONTEXT_ACTION_SET_TOKEN,
                    payload: accessToken
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

    const onClickSignUpLink = (event) => {
        event.preventDefault();
        dispatch({
            type: Constants.APP_CONTEXT_ACTION_SET_CURRENT_PAGE,
            payload: Constants.SIGN_UP_WINDOW_NAME
        });
    };

    const onClickGuessUser = (event) => {
        event.preventDefault();
        dispatch({
            type: Constants.APP_CONTEXT_ACTION_SET_CURRENT_PAGE,
            payload: Constants.HOME_WINDOW_NAME
        });
    };

    return (state.currentPage === LOG_IN_WINDOW_NAME &&
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log in
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
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
                        Sign In
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link onClick={onClickSignUpLink} href="#" variant="body2">
                                Don't have an account yet? Sign Up
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