import React, {useContext} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {mainListItems, secondaryListItems} from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import Button from "@material-ui/core/Button";
import * as Constants from "../../Constants";
import {removeAccessTokenLocalStorage} from "../../Utils";
import {AppContext} from "../../app-context";
import {HOME_WINDOW_NAME} from "../../Constants";
import OperationType from "../../molecules/operation_type/OperationType";
import PropertyType from "../../molecules/property_type/PropertyType";
import {SearchAsynchronous} from "../../molecules/search/SearchAsynchronous";
import {requestGetAds} from "../../molecules/search/SearchAsynchronousUtils";
import {SearchTemplate} from "../../templates/list/SearchTemplate/SearchTemplate";
import {SearchResultTemplate} from "../../templates/list/SearchResultTemplate/SearchResultTemplate";
import {ListCardItems} from "../../organisms/list/ListCardItems";
import Pagination from "@material-ui/lab/Pagination";

// import {onClickLoginButton, onClickLogoutButton} from '../login/LogInUtils'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
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
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    }
}));

export default function Dashboard() {
    const [state, dispatch] = useContext(AppContext);
    const [open, setOpen] = React.useState(true);

    const {list_items, paginator} = state.dataItems;
    console.log('state.selectedSearchResult', state.selectedSearchResult);
    console.log('state.dataItems', state.dataItems);


    const classes = useStyles();

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const onClickLoginButton = () => {
        dispatch({
            type: Constants.APP_CONTEXT_ACTION_SET_CURRENT_PAGE,
            payload: Constants.LOG_IN_WINDOW_NAME
        });
    };
    const onClickLogoutButton = () => {
        removeAccessTokenLocalStorage();
        dispatch({
            type: Constants.APP_CONTEXT_ACTION_SET_IS_LOGGED_IN,
            payload: false
        });
    };
    const handleOnSearchChange = (selectedSearchResult) => {

        if (selectedSearchResult) {
            dispatch({
                type: Constants.APP_CONTEXT_ACTION_SET_SELECTED_SEARCH_RESULT,
                payload: selectedSearchResult
            });

            requestGetAds(selectedSearchResult, 1).then(response => {
                console.log('handleOnSearchChange.requestGetAds.response.data', response.data);
                dispatch({
                    type: Constants.APP_CONTEXT_ACTION_SET_DATA_ITEMS,
                    payload: response.data
                });
            });
        }
    };

    const handleOnPaginationChange = (event, page) => {

        requestGetAds(state.selectedSearchResult, page).then(response => {
            console.log('handleOnPaginationChange.requestGetAds.response.data', response.data);
            dispatch({
                type: Constants.APP_CONTEXT_ACTION_SET_DATA_ITEMS,
                payload: response.data
            });
        });
    };

    // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


    const buttonLoginLogout = state.isLoggedIn ?
        <Button onClick={onClickLogoutButton} color="inherit">Logout</Button> :
        <Button onClick={onClickLoginButton} color="inherit">Login</Button>;

    return (state.currentPage === HOME_WINDOW_NAME &&
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Dashboard
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon/>
                        </Badge>
                    </IconButton>
                    {buttonLoginLogout}
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <List>{mainListItems}</List>
                <Divider/>
                <List>{secondaryListItems}</List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>

                <SearchTemplate
                    operationTypeSelector={<OperationType/>}
                    propertyTypeSelector={<PropertyType/>}
                    searchInput={
                        <SearchAsynchronous
                            url={Constants.URL_API_SEARCH_CITY_NEIGHBORHOOD}
                            handleOnChange={handleOnSearchChange}
                        />
                    }
                />

                {!!list_items.length && !!paginator &&
                <SearchResultTemplate
                    listCardItems={
                        <ListCardItems listItems={list_items}/>
                    }
                    pagination={
                        <Pagination
                            count={paginator.num_pages}
                            page={paginator.number}
                            size="large"
                            color="primary"
                            onChange={handleOnPaginationChange}
                        />
                    }
                />}
            </main>
        </div>
    );
}