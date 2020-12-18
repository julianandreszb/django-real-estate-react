import React, {useContext} from 'react'
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types'
import {AppContext} from '../../app-context';
import {CardViewImageDescription} from '../../molecules/cards/CardViewImageDescription';
import {requestGetAdById} from './ListCardItemsUtils'
import * as Constants from "../../Constants";

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

function ListCardItems(props) {

    const [state, dispatch] = useContext(AppContext);

    console.log('LogIn.state.currentPage', state.currentPage);

    const classes = useStyles();

    const onClickGridAdCard = (ad) => {
        dispatch({
            type: Constants.APP_CONTEXT_ACTION_SET_AD_OBJECT,
            payload: ad
        });

        dispatch({
            type: Constants.APP_CONTEXT_ACTION_SET_DASHBOARD_SUB_COMPONENT,
            payload: Constants.DASHBOARD_SUB_COMPONENT_VIEW_AD
        });
    };

    return (
        <Container className={classes.cardGrid} maxWidth={false}>
            <Grid container spacing={4}>
                {props.listItems.map((ad) => (
                    // <Grid item key={ad.id} xs={12} sm={6} md={4} onClick={() => requestGetAdById(ad.id)}>
                    <Grid item key={ad.id} xs={12} sm={6} md={4} onClick={() => onClickGridAdCard(ad)}>
                        <CardViewImageDescription ad={ad}/>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );

}

ListCardItems.propTypes = {
    "listItems": PropTypes.arrayOf(PropTypes.object).isRequired
};

export {ListCardItems}