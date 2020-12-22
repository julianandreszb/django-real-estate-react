import React, {useContext, useState} from 'react'
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import * as Constants from "../../Constants";
import {AppContext} from "../../app-context";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import {requestCreateAd} from './CreateAdUtils'

import {TITLE_ALERT_DIALOG_ERROR_CREATING_NEW_USER_TITLE} from "../../Constants";
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
import {OperationType} from "../../molecules/operation_type/OperationType";
import {PropertyType} from "../../molecules/property_type/PropertyType";
import {SearchAsynchronous} from "../../molecules/search/SearchAsynchronous";
import {AlertDialog} from "../../molecules/dialogs/Dialogs";

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
    const [neighborhoodId, setNeighborhoodId] = useState(null);
    const [operationTypeId, setOperationTypeId] = useState(1);
    const [propertyTypeId, setPropertyTypeId] = useState(1);

    //region AlertDialog states
    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const [alertDialogTitle, setAlertDialogTitle] = useState("");
    const [alertDialogContentText, setAlertDialogContentText] = useState("");
    //endregion


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
        description: yup.string().required(),
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
        // setAlertDialogTitle(TITLE_ALERT_DIALOG_ERROR_CREATING_NEW_USER_TITLE);
        // setAlertDialogContentText("");
        // setAlertDialogContentTextList(error.response.data.errors);
        // setOpenAlertDialog(true);
    };
    const handleRequestAccessTokenError = error => {
        //TODO
    };

    const onSubmit = async (dataForm) => {


        console.log('onSubmit.neighborhoodId', neighborhoodId);
        console.log('onSubmit.operationTypeId', operationTypeId);
        console.log('onSubmit.propertyTypeId', propertyTypeId);
        console.log('onSubmit.dataForm', dataForm);

        if (!!!neighborhoodId) {
            setAlertDialogTitle(Constants.TITLE_ALERT_DIALOG_ERROR_EMPTY_NEIGHBORHOOD_TITLE);
            setAlertDialogContentText('Neighborhood is required');
            setOpenAlertDialog(true);
            return;
        }


        console.log('dataForm.imageOne', dataForm.imageOne);

        // //TODO USING MULTI-PART FORM
        const data = new FormData();
        data.append('neighborhood', neighborhoodId);
        data.append('property_type', propertyTypeId);
        data.append('operation_type', operationTypeId);
        data.append('description', dataForm.description);
        data.append('address', dataForm.address);
        data.append('total_area', dataForm.totalArea);
        data.append('built_area', dataForm.builtArea);
        data.append('rooms', dataForm.rooms);
        data.append('bathrooms', dataForm.bathrooms);
        data.append('parking_lots', dataForm.parkingLots);
        data.append('antiquity', dataForm.antiquity);
        data.append('file', dataForm.imageOne[0]);
        data.append('price', dataForm.price);
        data.append('zip', dataForm.zip);


        //TODO Using JSON OBJECT
        // const data = {
        //     'neighborhood': neighborhoodId,
        //     'property_type': propertyTypeId,
        //     'operation_type': operationTypeId,
        //     'description': dataForm.description,
        //     'address': dataForm.address,
        //     'total_area': dataForm.totalArea,
        //     'built_area': dataForm.builtArea,
        //     'rooms': dataForm.rooms,
        //     'bathrooms': dataForm.bathrooms,
        //     'parking_lots': dataForm.parkingLots,
        //     'antiquity': dataForm.antiquity,
        //     // 'file': dataForm.imageOne,
        //     'price': dataForm.price,
        //     'zip': dataForm.zip
        // };

        const requestCreateAdResult = await requestCreateAd(data, state.token).then((response) => {

        });

        console.log('CreateAd.requestCreateAdResult', requestCreateAdResult);

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
                        <OperationType handleOnChange={(value) => {
                            console.log('CreateAd.SearchTemplate.operationTypeSelector.OperationType.handleOnChange');
                            setOperationTypeId(value);
                        }}/>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3} xl={3}>
                        <PropertyType handleOnChange={(value) => {
                            console.log('CreateAd.SearchTemplate.propertyTypeSelector.PropertyType.handleOnChange');
                            setPropertyTypeId(value)
                        }}/>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3} xl={3}>
                        <SearchAsynchronous
                            url={Constants.URL_API_SEARCH_NEIGHBORHOOD}
                            handleOnChange={(value) => {
                                if (!!value && value.id) {
                                    setNeighborhoodId(value.id);
                                } else {
                                    setNeighborhoodId(null);
                                }
                            }}
                            label={"Search neighborhood"}/>
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
                    <Grid item xs={12} md={12} lg={12} xl={12}>
                        <TextField
                            type="text"
                            name="description"
                            variant="outlined"
                            fullWidth
                            id="description"
                            label="Description"
                            inputRef={register}
                            error={!!errors.description}
                            helperText={errors.description?.message}
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
            <AlertDialog
                dialogTitle={alertDialogTitle}
                dialogContentText={alertDialogContentText}
                onClose={() => {
                    console.log('CreateAd.onCloseAlertDialog');

                    setAlertDialogTitle("");
                    setAlertDialogContentText("");
                    setOpenAlertDialog(false);
                }}
                open={openAlertDialog}/>
        </div>
    );
}

CreateAd.propTypes = {
    // "operationTypeSelector": PropTypes.element.isRequired,
    // "propertyTypeSelector": PropTypes.element.isRequired,
    // "searchNeighborhoodInput": PropTypes.element.isRequired,
};

export {CreateAd}