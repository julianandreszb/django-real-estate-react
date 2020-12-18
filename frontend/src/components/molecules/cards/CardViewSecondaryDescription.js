import React from 'react'
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardContent: {
        flexGrow: 1,
    },
    typographyCustom: {
        paddingTop: theme.spacing(1),
    }
}));

function CardViewSecondaryDescription(props) {

    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                <Typography className={classes.typographyCustom} variant="h5" component="h2">
                    Description
                </Typography>
                <Typography className={classes.typographyCustom} variant="body2" component="p">
                    {`$ ${props.ad.description}`}
                </Typography>
            </CardContent>
        </Card>
    );

}

CardViewSecondaryDescription.propTypes = {
    "ad": PropTypes.object.isRequired
};

export {CardViewSecondaryDescription}