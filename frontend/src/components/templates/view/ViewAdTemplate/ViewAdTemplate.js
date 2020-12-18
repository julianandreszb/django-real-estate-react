import React from 'react'
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Hidden from "@material-ui/core/Hidden";
import PropTypes from "prop-types";
import {GridCharacteristics} from "../../../molecules/GridList/GridCharacteristics";

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    }
}));

function ViewAdTemplate(props) {

    const classes = useStyles();

    return (
        <Container className={classes.cardGrid} maxWidth={false}>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                    <Grid container spacing={1}>
                        <Hidden smDown>
                            <Grid item sm={3} md={3} lg={3} xl={3}>
                                {props.GridListImageSelector}
                            </Grid>
                        </Hidden>
                        <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                            {props.CardViewImage}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                    {props.CardViewMainDescription}
                </Grid>
            </Grid>
            {props.GridCharacteristics}
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    {props.CardViewSecondaryDescription}
                </Grid>
            </Grid>
        </Container>
    )

}

ViewAdTemplate.propTypes = {
    "GridListImageSelector": PropTypes.element.isRequired,
    "CardViewImage": PropTypes.element.isRequired,
    "CardViewMainDescription": PropTypes.element.isRequired,
    "CardViewSecondaryDescription": PropTypes.element.isRequired,
    "GridCharacteristics": PropTypes.element.isRequired,
};

export {ViewAdTemplate}