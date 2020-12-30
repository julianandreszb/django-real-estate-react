import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import React, {useContext, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {AppContext} from "../../app-context";

const useStyles = makeStyles((theme) => ({
    rootCard: {
        // maxWidth: 345,
    },
    mediaCard: {
        height: 450,
    }
}));

function CardViewImage(props) {

    const [state, dispatch] = useContext(AppContext);
    const classes = useStyles();

    return (
        <Card className={classes.rootCard}>
            <CardActionArea>
                <CardMedia
                    className={classes.mediaCard}
                    image={props.itemsData[state.cardViewImageIndex].file_path}
                    title={props.itemsData[state.cardViewImageIndex].file_path}
                />
            </CardActionArea>
        </Card>
    );
}

CardViewImage.propTypes = {
    "itemsData": PropTypes.arrayOf(PropTypes.object).isRequired
};

export {CardViewImage}