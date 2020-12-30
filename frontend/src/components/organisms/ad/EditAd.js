import React, {useContext, useState} from 'react'
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import * as Constants from "../../Constants";
import {AppContext} from "../../app-context";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import {requestCreateAd, requestEditAd} from './CreateAdUtils'

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
import {requestGetAdById} from "../list/ListCardItemsUtils";
import {CardViewEditImageActions} from "../../molecules/cards/CardViewEditImageActions";

const useStyles = makeStyles((theme) => ({
    paper: {
        // marginTop: theme.spacing(8),
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

function EditAd(props) {

    const [state, dispatch] = useContext(AppContext);
    const [neighborhoodId, setNeighborhoodId] = useState(state.adObject.neighborhood.id);
    const [operationTypeId, setOperationTypeId] = useState(1);
    const [propertyTypeId, setPropertyTypeId] = useState(1);

    //region AlertDialog states
    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const [alertDialogTitle, setAlertDialogTitle] = useState("");
    const [alertDialogContentText, setAlertDialogContentText] = useState("");
    //endregion

    const [image1IdDeleted, setImage1IdDeleted] = useState('');
    const [image2IdDeleted, setImage2IdDeleted] = useState('');
    const [image3IdDeleted, setImage3IdDeleted] = useState('');
    const [image4IdDeleted, setImage4IdDeleted] = useState('');
    const [image5IdDeleted, setImage5IdDeleted] = useState('');


    console.log('state.token', state.token);

    const SUPPORTED_FORMATS = [
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/png"
    ];

    console.log('LogIn.state.currentPage', state.currentPage);

    const fileValidationRequired = yup
        .mixed()
        .required("A file is required")
        .test(
            "fileSize",
            "File too large",
            function (value) {
                return !!value && !!value.length && value[0].size <= 20000000
            }
        )
        .test(
            "type",
            "Unsupported Format",
            function (value) {
                return !!value && !!value.length && SUPPORTED_FORMATS.includes(value[0].type)
            }
        );
    const fileValidationOptional = yup
        .mixed()
        .test(
            "fileSize",
            "File too large",
            function (value) {
                return !!value && !!value.length && value[0].size <= 20000000
            }
        )
        .test(
            "type",
            "Unsupported Format",
            function (value) {
                return !!value && !!value.length && SUPPORTED_FORMATS.includes(value[0].type)
            }
        );

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
        // image1: fileValidationRequired,
        // image2: fileValidationOptional,
        // image3: fileValidationOptional,
        // image4: fileValidationOptional,
        // image5: fileValidationOptional,
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

        // Axios interprets this data as MULTI-PART FORM
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
        data.append('price', dataForm.price);
        data.append('zip', dataForm.zip);

        data.append('image1IdDeleted', image1IdDeleted);
        data.append('image2IdDeleted', image2IdDeleted);
        data.append('image3IdDeleted', image3IdDeleted);
        data.append('image4IdDeleted', image4IdDeleted);
        data.append('image5IdDeleted', image5IdDeleted);

        if (!!image1IdDeleted && !!dataForm.image1 && !!dataForm.image1.length) {
            data.append('image1', dataForm.image1[0]);
        }
        if (!!image2IdDeleted && !!dataForm.image2 && !!dataForm.image2.length) {
            data.append('image2', dataForm.image2[0]);
        }
        if (!!image3IdDeleted && !!dataForm.image3 && !!dataForm.image3.length) {
            data.append('image3', dataForm.image3[0]);
        }
        if (!!image4IdDeleted && dataForm.image4 && !!dataForm.image4.length) {
            data.append('image4', dataForm.image4[0]);
        }
        if (!!image5IdDeleted && !!dataForm.image5 && !!dataForm.image5.length) {
            data.append('image5', dataForm.image5[0]);
        }


        const requestCreateAdResult = await requestEditAd(state.adObject.id, data, state.token).then((response) => {
            return response.data;
        });

        console.log('CreateAd.requestCreateAd.requestCreateAdResult', requestCreateAdResult);

        // const adResponse = await requestGetAdById(requestCreateAdResult.id).then(response => {
        //     return response;
        // });

        dispatch({
            type: Constants.APP_CONTEXT_ACTION_SET_AD_OBJECT,
            payload: requestCreateAdResult
        });

        dispatch({
            type: Constants.APP_CONTEXT_ACTION_SET_DASHBOARD_SUB_COMPONENT,
            payload: Constants.DASHBOARD_SUB_COMPONENT_VIEW_AD
        });

    };

    // const handleDeleteImage = (imageId) => {
    //
    //     console.log('handleDeleteImage.imageId', imageId);
    //
    //     switch (imageId) {
    //         case 0:
    //             setImage1IdDeleted(true);
    //             break;
    //         case 1:
    //             setImage2IdDeleted(true);
    //             break;
    //         case 2:
    //             setImage3IdDeleted(true);
    //             break;
    //         case 3:
    //             setImage4IdDeleted(true);
    //             break;
    //         case 4:
    //             setImage5IdDeleted(true);
    //             break;
    //     }
    // };

    return (
        <div className={classes.paper}>
            {/*<Typography component="h1" variant="h5">*/}
            {/*    Create Ad*/}
            {/*</Typography>*/}
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={3} xl={3}>
                        <OperationType handleOnChange={(value) => {
                            console.log('EditAd.SearchTemplate.operationTypeSelector.OperationType.handleOnChange');
                            setOperationTypeId(value);
                        }} defaultValue={operationTypeId}/>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3} xl={3}>
                        <PropertyType handleOnChange={(value) => {
                            console.log('CreateAd.SearchTemplate.propertyTypeSelector.PropertyType.handleOnChange');
                            setPropertyTypeId(value)
                        }} defaultValue={propertyTypeId}/>
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
                            label={"Search neighborhood"} defaultValue={state.adObject.neighborhood}/>
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
                            defaultValue={state.adObject.zip}
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
                            defaultValue={state.adObject.address}
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
                            defaultValue={state.adObject.total_area}
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
                            defaultValue={state.adObject.built_area}
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
                            defaultValue={state.adObject.rooms}
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
                            defaultValue={state.adObject.bathrooms}
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
                            defaultValue={state.adObject.parking_lots}
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
                            defaultValue={state.adObject.antiquity}
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
                            defaultValue={state.adObject.price}
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
                            defaultValue={state.adObject.description}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={3} xl={3}>
                        {!!image1IdDeleted ?
                            <TextField
                                type="file"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                name="image1"
                                variant="outlined"
                                fullWidth
                                id="image1"
                                label="Image 1"
                                inputRef={register}
                                error={!!errors.image1}
                                helperText={errors.image1?.message}
                            />
                            :
                            <CardViewEditImageActions
                                file_path={state.adObject.resources[0].file_path}
                                onConfirmDeleteButton={() => setImage1IdDeleted(state.adObject.resources[0].id)}
                                // onConfirmDeleteButton={() => handleDeleteImage(0)}
                            />}
                    </Grid>
                    <Grid item xs={12} md={6} lg={3} xl={3}>
                        {!!image2IdDeleted ?
                            <TextField
                                type="file"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                name="image2"
                                variant="outlined"
                                fullWidth
                                id="image2"
                                label="Image 2"
                                inputRef={register}
                                error={!!errors.image2}
                                helperText={errors.image2?.message}
                            />
                            :
                            <CardViewEditImageActions
                                file_path={state.adObject.resources[1].file_path}
                                // onConfirmDeleteButton={() => handleDeleteImage(1)}
                                onConfirmDeleteButton={() => setImage2IdDeleted(state.adObject.resources[1].id)}
                            />}

                    </Grid>
                    <Grid item xs={12} md={6} lg={3} xl={3}>
                        {!!image3IdDeleted ?
                            <TextField
                                type="file"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                name="image3"
                                variant="outlined"
                                fullWidth
                                id="image3"
                                label="Image 3"
                                inputRef={register}
                                error={!!errors.image3}
                                helperText={errors.image3?.message}
                            />
                            :
                            <CardViewEditImageActions
                                file_path={state.adObject.resources[2].file_path}
                                // onConfirmDeleteButton={() => handleDeleteImage(2)}
                                onConfirmDeleteButton={() => setImage3IdDeleted(state.adObject.resources[2].id)}
                            />}

                    </Grid>
                    <Grid item xs={12} md={6} lg={3} xl={3}>
                        {!!image4IdDeleted ?
                            <TextField
                                type="file"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                name="image4"
                                variant="outlined"
                                fullWidth
                                id="image4"
                                label="Image 4"
                                inputRef={register}
                                error={!!errors.image4}
                                helperText={errors.image4?.message}
                            />
                            :
                            <CardViewEditImageActions
                                file_path={state.adObject.resources[3].file_path}
                                // onConfirmDeleteButton={() => handleDeleteImage(3)}
                                onConfirmDeleteButton={() => setImage4IdDeleted(state.adObject.resources[3].id)}
                            />}

                    </Grid>
                    <Grid item xs={12} md={6} lg={3} xl={3}>
                        {!!image5IdDeleted ?
                            <TextField
                                type="file"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                name="image5"
                                variant="outlined"
                                fullWidth
                                id="image5"
                                label="Image 5"
                                inputRef={register}
                                error={!!errors.image5}
                                helperText={errors.image5?.message}
                            />
                            :
                            <CardViewEditImageActions
                                file_path={state.adObject.resources[4].file_path}
                                // onConfirmDeleteButton={() => handleDeleteImage(4)}
                                onConfirmDeleteButton={() => setImage5IdDeleted(state.adObject.resources[4].id)}
                            />}

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

EditAd.propTypes = {
    // "operationTypeSelector": PropTypes.element.isRequired,
    // "propertyTypeSelector": PropTypes.element.isRequired,
    // "searchNeighborhoodInput": PropTypes.element.isRequired,
};

export {EditAd}