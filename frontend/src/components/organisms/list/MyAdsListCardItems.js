import React, {useContext, useEffect, useState} from 'react'
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {AppContext} from '../../app-context';
import {requestGetMyAds} from './MyAdsListCardItemsUtils'
import {CardViewImageDescriptionActions} from "../../molecules/cards/CardViewImageDescriptionActions";
import {requestGetAdById} from "./ListCardItemsUtils";
import * as Constants from "../../Constants"

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        // paddingTop: theme.spacing(8),
        // paddingBottom: theme.spacing(8),
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

function MyAdsListCardItems(props) {

    const [state, dispatch] = useContext(AppContext);

    const [myAdsListItems, setMyAdsListItems] = useState([]);

    const loadMyAds = () => {
        const promiseGetMyAds = async () => await requestGetMyAds(state.token);

        promiseGetMyAds().then(response => {

            console.log('MyAdsListCardItems.js.MyAdsListCardItems.useEffect.response.data', response.data);

            setMyAdsListItems(response.data);
        });
    };

    useEffect(() => {
        loadMyAds();
    }, []);
    // });//Reload always


    const classes = useStyles();

    // const onClickGridAdCard = async (ad) => {
    //     //Search ad by ad ID ( Include resources in the response)
    //     const adResponse = await requestGetAdById(ad.id).then(response => {
    //         return response.data;
    //     });
    //
    //     dispatch({
    //         type: Constants.APP_CONTEXT_ACTION_SET_AD_OBJECT,
    //         payload: adResponse
    //     });
    //
    //     dispatch({
    //         type: Constants.APP_CONTEXT_ACTION_SET_DASHBOARD_SUB_COMPONENT,
    //         payload: Constants.DASHBOARD_SUB_COMPONENT_VIEW_AD
    //     });
    // };

    return (
        <Container className={classes.cardGrid} maxWidth={false}>
            <Grid container spacing={4}>
                {myAdsListItems.map((ad) => (
                    // <Grid item key={ad.id} xs={12} sm={6} md={4} onClick={() => onClickGridAdCard(ad)}>
                    <Grid item key={ad.id} xs={12} sm={6} md={4}>
                        <CardViewImageDescriptionActions ad={ad}/>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );

}

MyAdsListCardItems.propTypes = {
    // "listItems": PropTypes.arrayOf(PropTypes.object).isRequired
};

export {MyAdsListCardItems}