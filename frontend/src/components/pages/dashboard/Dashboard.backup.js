import AppBar from "@material-ui/core/AppBar";
import clsx from 'clsx';
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import {AppContext} from "../../app-context";
import {HOME_WINDOW_NAME} from "../../Constants";
import React, {useContext, useState} from "react";
import * as Constants from '../../Constants'
import makeStyles from "@material-ui/core/styles/makeStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import OperationType from "../../molecules/operation_type/OperationType";
import PropertyType from "../../molecules/property_type/PropertyType";
import {SearchAsynchronous} from '../../molecules/search/SearchAsynchronous'
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {removeAccessTokenLocalStorage} from "../../Utils";
import {ListCardItems} from '../../organisms/list/ListCardItems'
import {SearchTemplate} from "../../templates/list/SearchTemplate/SearchTemplate";
import Drawer from "@material-ui/core/Drawer";

export default function (props) {
    console.log('frontend/src/components/Dashboard.js.props', props);

    const [state, dispatch] = useContext(AppContext);

    const theme = props.theme;

    const [appTitle, setAppTitle] = useState('RealState');

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: 36,
        },
        menuButtonHidden: {
            display: 'none',
        },
        title: {
            flexGrow: 1,
        },
    }));

    const classes = useStyles(theme);

    function onClickLoginButton() {
        dispatch({
            type: Constants.APP_CONTEXT_ACTION_SET_CURRENT_PAGE,
            payload: Constants.LOG_IN_WINDOW_NAME
        });
    }

    function onClickLogoutButton() {
        removeAccessTokenLocalStorage();
        dispatch({
            type: Constants.APP_CONTEXT_ACTION_SET_IS_LOGGED_IN,
            payload: false
        });
    }

    console.log('state.isLoggedIn', state.isLoggedIn);

    const buttonLoginLogout = state.isLoggedIn ?
        <Button onClick={onClickLogoutButton} color="inherit">Logout</Button> :
        <Button onClick={onClickLoginButton} color="inherit">Login</Button>;

    return (state.currentPage === HOME_WINDOW_NAME &&
        <>
            <CssBaseline/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {appTitle}
                    </Typography>
                    {buttonLoginLogout}
                </Toolbar>
            </AppBar>

            <SearchTemplate
                operationTypeSelector={<OperationType/>}
                propertyTypeSelector={<PropertyType/>}
                searchInput={<SearchAsynchronous url={Constants.URL_API_SEARCH_CITY_NEIGHBORHOOD}/>}
            />

            {/*{false && <Container maxWidth="sm">*/}
            {/*    <Box my={4}>*/}
            {/*        <Typography variant="h4" component="h1" gutterBottom>*/}
            {/*            Create React App v4-beta example*/}
            {/*        </Typography>*/}
            {/*        <form className={classes.form}>*/}
            {/*            <Grid container spacing={2}>*/}
            {/*                <Grid item xs={12} sm={3}>*/}
            {/*                    <OperationType/>*/}
            {/*                </Grid>*/}
            {/*                <Grid item xs={12} sm={3}>*/}
            {/*                    <PropertyType/>*/}
            {/*                </Grid>*/}
            {/*                <Grid item xs={12} sm={6}>*/}

            {/*                </Grid>*/}
            {/*            </Grid>*/}
            {/*        </form>*/}
            {/*    </Box>*/}
            {/*</Container>}*/}
            {/*<ListItems/>*/}
        </>
    )
}