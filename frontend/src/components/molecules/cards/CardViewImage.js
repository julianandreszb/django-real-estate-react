import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {ListCardItems} from "../../organisms/list/ListCardItems";

const useStyles = makeStyles((theme) => ({
    rootCard: {
        // maxWidth: 345,
    },
    mediaCard: {
        height: 450,
    }
}));

function CardViewImage(props) {

    const classes = useStyles();

    return (
        <Card className={classes.rootCard}>
            <CardActionArea>
                <CardMedia
                    className={classes.mediaCard}
                    image={props.img}
                    title="Contemplative Reptile"
                />
            </CardActionArea>
        </Card>
    );
}

CardViewImage.propTypes = {
    "img": PropTypes.string.isRequired
};

export {CardViewImage}