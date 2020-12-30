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
            type: Constants.APP_CONTEXT_ACTION_SET_DASHBOARD_SUB_COMPONENT_TITLE,
            payload: Constants.DASHBOARD_SUB_COMPONENT_TITLE_SEARCH_ADS
        });

        dispatch({
            type: Constants.APP_CONTEXT_ACTION_SET_DASHBOARD_SUB_COMPONENT,
            payload: Constants.DASHBOARD_SUB_COMPONENT_SEARCH_ADS
        });
    };
    const handleOnClickCreateAd = () => {

        dispatch({
            type: Constants.APP_CONTEXT_ACTION_SET_DASHBOARD_SUB_COMPONENT_TITLE,
            payload: Constants.DASHBOARD_SUB_COMPONENT_TITLE_CREATE_AD
        });

        dispatch({
            type: Constants.APP_CONTEXT_ACTION_SET_DASHBOARD_SUB_COMPONENT,
            payload: Constants.DASHBOARD_SUB_COMPONENT_CREATE_AD
        });
    };
    const handleOnClickMyAds = () => {

        dispatch({
            type: Constants.APP_CONTEXT_ACTION_SET_DASHBOARD_SUB_COMPONENT_TITLE,
            payload: Constants.DASHBOARD_SUB_COMPONENT_TITLE_MY_ADS
        });

        dispatch({
            type: Constants.APP_CONTEXT_ACTION_SET_DASHBOARD_SUB_COMPONENT,
            payload: Constants.DASHBOARD_SUB_COMPONENT_MY_ADS
        });
    };

    return (
        <List>
            <div>
                <ListItem button onClick={handleOnClickSearchAds}>
                    <ListItemIcon>
                        <SearchIcon/>
                    </ListItemIcon>
                    <ListItemText primary={Constants.DASHBOARD_SUB_COMPONENT_TITLE_SEARCH_ADS}/>
                </ListItem>
                {!!state.isLoggedIn && <ListItem button onClick={handleOnClickCreateAd}>
                    <ListItemIcon>
                        <PostAddIcon/>
                    </ListItemIcon>
                    <ListItemText primary={Constants.DASHBOARD_SUB_COMPONENT_TITLE_CREATE_AD}/>
                </ListItem>}
                {!!state.isLoggedIn && <ListItem button onClick={handleOnClickMyAds}>
                    <ListItemIcon>
                        <PostAddIcon/>
                    </ListItemIcon>
                    <ListItemText primary={Constants.DASHBOARD_SUB_COMPONENT_TITLE_MY_ADS}/>
                </ListItem>}
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