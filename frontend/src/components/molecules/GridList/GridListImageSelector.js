import GridListTile from "@material-ui/core/GridListTile";
import GridList from "@material-ui/core/GridList";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({

    gridList: {
        height: 450,
    }
}));

function GridListImageSelector(props) {

    const classes = useStyles();

    return (
        <GridList cellHeight={160} className={classes.gridList} cols={1}>
            {props.itemsData.map((tile) => (
                <GridListTile key={tile.img} cols={tile.cols || 1}>
                    <img src={tile.img} alt={tile.title}/>
                </GridListTile>
            ))}
        </GridList>
    );
}

GridListImageSelector.propTypes = {
    "itemsData": PropTypes.arrayOf(PropTypes.object).isRequired
};

export {GridListImageSelector}