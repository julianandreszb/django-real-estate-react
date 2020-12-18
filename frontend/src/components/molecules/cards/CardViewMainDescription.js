import React from 'react'
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: 14,
    },
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

function CardViewMainDescription(props) {

    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                <Typography className={`${classes.title} ${classes.typographyCustom}`} color="textSecondary" gutterBottom>
                    {props.ad.property_type.name} for {props.ad.operation_type.name}
                </Typography>
                <Typography className={classes.typographyCustom} variant="h5" component="h2">
                    {`$ ${props.ad.neighborhood.name}, ${props.ad.neighborhood.city.name}`}
                </Typography>
                <Typography className={classes.typographyCustom} variant="h3" component="h2">
                    {`$ ${props.ad.price}`}
                </Typography>
                <Typography className={classes.typographyCustom} variant="body2" component="p">
                    {`${props.ad.total_area} m² total`}
                </Typography>
                <Typography className={classes.typographyCustom} variant="body2" component="p">
                    {`${props.ad.rooms} room(s).`}
                </Typography>
                <Typography className={classes.typographyCustom} variant="body2" component="p">
                    {`${props.ad.bathrooms} bathroom(s).`}
                </Typography>
            </CardContent>
        </Card>
    );

}

CardViewMainDescription.propTypes = {
    "ad": PropTypes.object.isRequired
};

export {CardViewMainDescription}