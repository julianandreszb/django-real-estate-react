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
import {requestDeleteAdById} from '../../organisms/list/MyAdsListCardItemsUtils'
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

function CardViewEditImageActions(props) {

    const [openDialog, setOpenDialog] = useState(false);

    const classes = useStyles();

    const onConfirmButton = (ad) => {

        setOpenDialog(false);
        props.onConfirmDeleteButton();
        // const requestDeleteAdByIdPromise = requestDeleteAdById(ad.id, state.token);
        //
        // requestDeleteAdByIdPromise.then(response => {
        //     console.log('CardViewImageDescriptionActions.js,requestDeleteAdById.response.data', response.data);
        //
        //     dispatch({
        //         type: Constants.APP_CONTEXT_ACTION_SET_DASHBOARD_SUB_COMPONENT,
        //         payload: Constants.DASHBOARD_SUB_COMPONENT_MY_ADS
        //     });
        // });
    };
    const onDeclineButton = () => {
        setOpenDialog(false);
    };

    const handleOnDeleteButton = () => {
        setOpenDialog(true);
    };

    const onCloseDeclineConfirmDialog = () => {
        console.log('onCloseDeclineConfirmDialog');

    };

    return (
        <>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image={props.file_path}
                    title="Image title"
                />
                <CardActions disableSpacing>
                    <IconButton aria-label="Delete AD" onClick={handleOnDeleteButton}>
                        <DeleteIcon/>
                    </IconButton>
                </CardActions>
            </Card>
            <DeclineConfirmDialog
                dialogContentText={'Are you sure you want to delete this image?'}
                dialogTitle={'Please Confirm'}
                onConfirmButton={props.onConfirmDeleteButton}
                onDeclineButton={onDeclineButton}
                open={openDialog}
                onClose={onCloseDeclineConfirmDialog}
            />
        </>
    );

}

CardViewEditImageActions.propTypes = {
    "file_path": PropTypes.string.isRequired,
    "onConfirmDeleteButton": PropTypes.func.isRequired,
    // "ad": PropTypes.object.isRequired
};

export {CardViewEditImageActions}