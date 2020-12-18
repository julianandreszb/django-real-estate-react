import React, {useContext, useState} from 'react'
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import * as Constants from "../../Constants";
import {AppContext} from "../../app-context";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import PropTypes from 'prop-types'

import {TITLE_ALERT_DIALOG_ERROR_CREATING_NEW_USER} from "../../Constants";
import {requestLogIn} from "../../pages/login/LogInUtils";
import {
    getAccessTokenLocalStorage,
    requestAccessToken,
    saveAccessTokenLocalStorage,
    saveUserLocalStorage
} from "../../Utils";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {GridCharacteristics} from "../../molecules/GridList/GridCharacteristics";

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

function CreateAd(props) {

    const [state, dispatch] = useContext(AppContext);

    console.log('LogIn.state.currentPage', state.currentPage);

    const classes = useStyles();
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
    });
    const {register, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema)
    });

    const handleCreateUserError = error => {
        // setAlertDialogTitle(TITLE_ALERT_DIALOG_ERROR_CREATING_NEW_USER);
        // setAlertDialogContentText("");
        // setAlertDialogContentTextList(error.response.data.errors);
        // setOpenAlertDialog(true);
    };
    const handleRequestAccessTokenError = error => {
        //TODO
    };

    const onSubmit = async dataForm => {

        // setOpenLoadingDialog(true);
        //
        // const responseLogInUser = await requestLogIn(dataForm)
        //     .then(responseLogIn => {
        //         console.log('requestLogIn.responseLogIn', responseLogIn);
        //
        //         saveUserLocalStorage(responseLogIn);
        //
        //         setOpenLoadingDialog(false);
        //         return responseLogIn;
        //     }).catch(function (error) {
        //         console.log('requestLogIn.catch.error', error.response);
        //         setOpenLoadingDialog(false);
        //         handleCreateUserError(error);
        //         return null;
        //     });
        //
        // console.log('responseLogInUser', responseLogInUser);
        //
        // if (!!responseLogInUser && !!responseLogInUser.data) {
        //
        //     let responseAccessToken;
        //
        //     if (typeof responseLogInUser.data.access_token !== 'undefined' &&
        //         typeof responseLogInUser.data.refresh_token !== 'undefined') {
        //
        //         saveAccessTokenLocalStorage(responseLogInUser);
        //         responseAccessToken = getAccessTokenLocalStorage();
        //     } else {
        //
        //         responseAccessToken = await requestAccessToken(dataForm)
        //             .then(responseAccessToken => {
        //                 console.log('requestAccessToken.responseAccessToken', responseAccessToken);
        //
        //                 saveAccessTokenLocalStorage(responseAccessToken.data);
        //                 const accessToken = getAccessTokenLocalStorage();
        //                 console.log('accessToken', accessToken);
        //
        //                 return responseAccessToken;
        //             }).catch(function (error) {
        //                 console.log('requestAccessToken.catch.error', error.response);
        //                 handleRequestAccessTokenError(error);
        //                 return null;
        //             });
        //     }
        //
        //     if (!!responseAccessToken) {
        //         dispatch({
        //             type: Constants.APP_CONTEXT_ACTION_SET_IS_LOGGED_IN,
        //             payload: true
        //         });
        //         dispatch({
        //             type: Constants.APP_CONTEXT_ACTION_SET_CURRENT_PAGE,
        //             payload: Constants.HOME_WINDOW_NAME
        //         });
        //     }
        // }
    };

    return (
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Create Ad
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        {props.operationTypeSelector}
                    </Grid>
                    <Grid item xs={3}>
                        {props.propertyTypeSelector}
                    </Grid>
                    <Grid item xs={3}>
                        {props.searchNeighborhoodInput}
                    </Grid>
                    <Grid item xs={3}>
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
                    <Grid item xs={3}>
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
            </form>
        </div>
    );
}

CreateAd.propTypes = {
    "operationTypeSelector": PropTypes.element.isRequired,
    "propertyTypeSelector": PropTypes.element.isRequired,
    "searchNeighborhoodInput": PropTypes.element.isRequired,
};

export {CreateAd}