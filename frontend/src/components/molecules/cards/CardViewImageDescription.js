import React from 'react'
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
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
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    }
}));

function CardViewImageDescription(props) {

    const classes = useStyles();

    return (
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
        </Card>
    );

}

CardViewImageDescription.propTypes = {
    "ad": PropTypes.object.isRequired
};

export {CardViewImageDescription}