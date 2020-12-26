import React, {useContext} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import PostAddIcon from '@material-ui/icons/PostAdd';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SearchIcon from '@material-ui/icons/Search';
import {AppContext} from "../../app-context";
import * as Constants from "../../Constants";
import List from "@material-ui/core/List";

function MainListItems(props) {
    const [state, dispatch] = useContext(AppContext);

    const handleOnClickSearchAds = () => {
        dispatch({
            type: Constants.APP_CONTEXT_ACTION_SET_DASHBOARD_SUB_COMPONENT,
            payload: Constants.DASHBOARD_SUB_COMPONENT_SEARCH_ADS
        });
    };
    const handleOnClickCreateAd = () => {
        dispatch({
            type: Constants.APP_CONTEXT_ACTION_SET_DASHBOARD_SUB_COMPONENT,
            payload: Constants.DASHBOARD_SUB_COMPONENT_CREATE_AD
        });
    };

    return (
        <List>
            <div>
                <ListItem button onClick={handleOnClickSearchAds}>
                    <ListItemIcon>
                        <SearchIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Search ADS"/>
                </ListItem>
                <ListItem button onClick={handleOnClickCreateAd}>
                    <ListItemIcon>
                        <PostAddIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Create AD"/>
                </ListItem>
            </div>
        </List>
    )
}

function SecondaryListItems(props) {
    return (
        <List>
            <div>
                <ListSubheader inset>Saved reports</ListSubheader>
                <ListItem button>
                    <ListItemIcon>
                        <AssignmentIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Current month"/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <AssignmentIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Last quarter"/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <AssignmentIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Year-end sale"/>
                </ListItem>
            </div>
        </List>
    )
}

export {MainListItems, SecondaryListItems}