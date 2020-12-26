import GridListTile from "@material-ui/core/GridListTile";
import GridList from "@material-ui/core/GridList";
import React, {useContext} from "react";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {AppContext} from "../../app-context";
import * as Constants from "../../Constants";

const useStyles = makeStyles((theme) => ({

    gridList: {
        height: 450,
    }
}));

function GridListImageSelector(props) {
    const [state, dispatch] = useContext(AppContext);
    const classes = useStyles();

    const handleOnClickGridListTile = (index) => {
        console.log('GridListImageSelector.handleOnClickGridListTile.index', index);

        dispatch({
            type: Constants.APP_CONTEXT_ACTION_SET_CARD_VIEW_IMAGE_INDEX,
            payload: index
        });
    };

    return (
        <GridList cellHeight={160} className={classes.gridList} cols={1}>
            {props.itemsData.map((tile, index) => (
                <GridListTile key={tile.id} cols={tile.cols || 1} onClick={() => handleOnClickGridListTile(index)}>
                    <img src={tile.file_path} alt={tile.file_path}/>
                </GridListTile>
            ))}
        </GridList>
    );
}

GridListImageSelector.propTypes = {
    "itemsData": PropTypes.arrayOf(PropTypes.object).isRequired
};

export {GridListImageSelector}