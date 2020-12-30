import React, {useContext, useState} from 'react'
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CardActions from '@material-ui/core/CardActions';
import {DeclineConfirmDialog} from '../dialogs/Dialogs';
import {requestDeleteAdById, requestGetMyAds} from '../../organisms/list/MyAdsListCardItemsUtils'
import {AppContext} from "../../app-context";
import * as Constants from "../../Constants";
import {requestGetAdById} from "../../organisms/list/ListCardItemsUtils";

const useStyles = makeStyles((theme) => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    }
}));

function CardViewImageDescriptionActions(props) {

    const [state, dispatch] = useContext(AppContext);

    const [openDialog, setOpenDialog] = useState(false);

    const classes = useStyles();

    const onConfirmButton = (ad) => {
        setOpenDialog(false);
        const requestDeleteAdByIdPromise = requestDeleteAdById(ad.id, state.token);

        requestDeleteAdByIdPromise.then(response => {
            console.log('CardViewImageDescriptionActions.js,requestDeleteAdById.response.data', response.data);

            const promiseGetMyAds = async () => await requestGetMyAds(state.token);

            promiseGetMyAds().then(response => {

                console.log('CardViewImageDescriptionActions.js.onConfirmButton.requestGetMyAds.response.data', response.data);

                dispatch({
                    type: Constants.APP_CONTEXT_ACTION_SET_MY_ADS,
                    payload: response.data
                });

                dispatch({
                    type: Constants.APP_CONTEXT_ACTION_SET_DASHBOARD_SUB_COMPONENT,
                    payload: Constants.DASHBOARD_SUB_COMPONENT_MY_ADS
                });

            });

        });
    };
    const onDeclineButton = () => {
        setOpenDialog(false);
    };

    const handleOnDeleteButton = () => {
        setOpenDialog(true);
    };
    const handleOnEditButton = async (ad) => {

        //Search ad by ad ID ( Include resources in the response)
        const adResponse = await requestGetAdById(ad.id).then(response => {
            return response.data;
        });

        dispatch({
            type: Constants.APP_CONTEXT_ACTION_SET_AD_OBJECT,
            payload: adResponse
        });

        dispatch({
            type: Constants.APP_CONTEXT_ACTION_SET_DASHBOARD_SUB_COMPONENT,
            payload: Constants.DASHBOARD_SUB_COMPONENT_EDIT_AD
        });

    };

    const onCloseDeclineConfirmDialog = () => {
        console.log('onCloseDeclineConfirmDialog');

    };

    return (
        <>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image={props.ad.resources[0].file_path}
                    title="Image title"
                />
                <CardHeader
                    title={`$ ${props.ad.price}`}
                    subheader={`${props.ad.total_area} m² area | ${props.ad.rooms} room(s).`}
                />
                <CardContent className={classes.cardContent}>
                    <Typography variant="body1">
                        {props.ad.property_type.name} for {props.ad.operation_type.name}
                    </Typography>
                    <Typography variant="body2">
                        {props.ad.address}, {props.ad.neighborhood.name}, {props.ad.neighborhood.city.name}, {props.ad.neighborhood.city.department.name}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="Delete AD" onClick={handleOnDeleteButton}>
                        <DeleteIcon/>
                    </IconButton>
                    <IconButton aria-label="Edit AD" onClick={() => handleOnEditButton(props.ad)}>
                        <EditIcon/>
                    </IconButton>
                </CardActions>
            </Card>
            <DeclineConfirmDialog
                dialogContentText={'Are you sure you want to permanently delete this AD?'}
                dialogTitle={'Please Confirm'}
                onConfirmButton={() => {
                    onConfirmButton(props.ad)
                }}
                onDeclineButton={onDeclineButton}
                open={openDialog}
                onClose={onCloseDeclineConfirmDialog}
            />
        </>
    );

}

CardViewImageDescriptionActions.propTypes = {
    "ad": PropTypes.object.isRequired
};

export {CardViewImageDescriptionActions}