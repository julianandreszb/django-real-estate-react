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
import {requestCreateAd} from './CreateAdUtils'

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
import Button from "@material-ui/core/Button";

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


    console.log('state.token', state.token);

    const SUPPORTED_FORMATS = [
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/png"
    ];

    console.log('LogIn.state.currentPage', state.currentPage);

    const classes = useStyles();
    const schema = yup.object().shape({
        zip: yup.string(),
        address: yup.string().required(),
        totalArea: yup.number().required(),
        builtArea: yup.number().required(),
        rooms: yup.number().required(),
        bathrooms: yup.number().required(),
        parkingLots: yup.number().required(),
        antiquity: yup.number().required(),
        price: yup.number().required(),
        imageOne: yup
            .mixed()
            .required("A file is required")
            .test(
                "fileSize",
                "File too large",
                (value) => {
                    return value && value[0].size <= 2000000
                }
            )
            .test(
                "type",
                "Unsupported Format",
                (value) => {
                    return value && SUPPORTED_FORMATS.includes(value[0].type)
                }
            )
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

    const onSubmit = async (dataForm) => {

        console.log('onSubmit.dataForm', dataForm);


        //TODO USING MULTI-PART FORM
        // const data = new FormData();
        // data.append('address', dataForm.address);
        // data.append('antiquity', dataForm.antiquity);
        // data.append('bathrooms', dataForm.bathrooms);
        // data.append('builtArea', dataForm.builtArea);
        // data.append('imageOne', dataForm.imageOne[0]);
        // data.append('file', dataForm.imageOne[0]);
        // data.append('parkingLots', dataForm.parkingLots);
        // data.append('price', dataForm.price);
        // data.append('rooms', dataForm.rooms);
        // data.append('totalArea', dataForm.totalArea);
        // data.append('zip', dataForm.zip);

        //TODO Using JSON OBJECT
        const data = {
            'neighborhood': 3001,
            'property_type': 2,
            'operation_type': 2,
            'description' : 'TEST',
            'address': dataForm.address,
            'total_area': dataForm.totalArea,
            'built_area': dataForm.builtArea,
            'rooms': dataForm.rooms,
            'bathrooms': dataForm.bathrooms,
            'parking_lots': dataForm.parkingLots,
            'antiquity': dataForm.antiquity,
            // 'file': dataForm.imageOne,
            'price': dataForm.price,
            'zip': dataForm.zip
        };

        await requestCreateAd(data, state.token);

        // const data = new FormData();

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
                    <Grid item xs={12} md={6} lg={3} xl={3}>
                        {props.operationTypeSelector}
                    </Grid>
                    <Grid item xs={12} md={6} lg={3} xl={3}>
                        {props.propertyTypeSelector}
                    </Grid>
                    <Grid item xs={12} md={6} lg={3} xl={3}>
                        {props.searchNeighborhoodInput}
                    </Grid>
                    <Grid item xs={12} md={6} lg={3} xl={3}>
                        <TextField
                            type="text"
                            name="zip"
                            variant="outlined"
                            fullWidth
                            id="zip"
                            label="ZIP"
                            autoComplete="postal-code"
                            inputRef={register}
                            error={!!errors.zip}
                            helperText={errors.zip?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} lg={6} xl={6}>
                        <TextField
                            type="text"
                            name="address"
                            variant="outlined"
                            fullWidth
                            id="address"
                            label="Address"
                            autoComplete="street-address"
                            inputRef={register}
                            error={!!errors.address}
                            helperText={errors.address?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3} xl={3}>
                        <TextField
                            type="number"
                            name="totalArea"
                            variant="outlined"
                            fullWidth
                            id="totalArea"
                            label="Total Area (m²)"
                            inputRef={register}
                            error={!!errors.totalArea}
                            helperText={errors.totalArea?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3} xl={3}>
                        <TextField
                            type="number"
                            name="builtArea"
                            variant="outlined"
                            fullWidth
                            id="builtArea"
                            label="Built Area (m²)"
                            inputRef={register}
                            error={!!errors.builtArea}
                            helperText={errors.builtArea?.message}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={3} xl={3}>
                        <TextField
                            type="number"
                            name="rooms"
                            variant="outlined"
                            fullWidth
                            id="rooms"
                            label="Rooms"
                            inputRef={register}
                            error={!!errors.rooms}
                            helperText={errors.rooms?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3} xl={3}>
                        <TextField
                            type="number"
                            name="bathrooms"
                            variant="outlined"
                            fullWidth
                            id="bathrooms"
                            label="Bathrooms"
                            inputRef={register}
                            error={!!errors.bathrooms}
                            helperText={errors.bathrooms?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3} xl={3}>
                        <TextField
                            type="number"
                            name="parkingLots"
                            variant="outlined"
                            fullWidth
                            id="parkingLots"
                            label="Parking Lots"
                            inputRef={register}
                            error={!!errors.parkingLots}
                            helperText={errors.parkingLots?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3} xl={3}>
                        <TextField
                            type="number"
                            name="antiquity"
                            variant="outlined"
                            fullWidth
                            id="antiquity"
                            label="Antiquity (Years)"
                            inputRef={register}
                            error={!!errors.antiquity}
                            helperText={errors.antiquity?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3} xl={3}>
                        <TextField
                            type="number"
                            name="price"
                            variant="outlined"
                            fullWidth
                            id="price"
                            label="price"
                            inputRef={register}
                            error={!!errors.price}
                            helperText={errors.price?.message}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={3} xl={3}>
                        <TextField
                            type="file"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            name="imageOne"
                            variant="outlined"
                            fullWidth
                            id="imageOne"
                            label="Image 1"
                            inputRef={register}
                            error={!!errors.imageOne}
                            helperText={errors.imageOne?.message}
                        />
                    </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    Submit
                </Button>
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