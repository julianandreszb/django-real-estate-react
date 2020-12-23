import React, {useContext, useState} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {mainListItems, secondaryListItems} from './listItems';
import Button from "@material-ui/core/Button";
import * as Constants from "../../Constants";
import {removeAccessTokenLocalStorage} from "../../Utils";
import {AppContext} from "../../app-context";
import {HOME_WINDOW_NAME} from "../../Constants";
import {requestGetAds} from "../../molecules/search/SearchAsynchronousUtils";
import {LoadingDialog} from "../../molecules/dialogs/Dialogs";
import {SearchTemplate} from "../../templates/list/SearchTemplate/SearchTemplate";
import {OperationType} from "../../molecules/operation_type/OperationType";
import {PropertyType} from "../../molecules/property_type/PropertyType";
import {SearchAsynchronous} from "../../molecules/search/SearchAsynchronous";
import Pagination from "@material-ui/lab/Pagination";
import {ListCardItems} from "../../organisms/list/ListCardItems";
import {SearchResultTemplate} from "../../templates/list/SearchResultTemplate/SearchResultTemplate";
import {ViewAdTemplate} from "../../templates/view/ViewAdTemplate/ViewAdTemplate";
import {CardViewImage} from "../../molecules/cards/CardViewImage";
import {GridListImageSelector} from "../../molecules/GridList/GridListImageSelector";
import {CardViewMainDescription} from "../../molecules/cards/CardViewMainDescription";
import {CardViewSecondaryDescription} from "../../molecules/cards/CardViewSecondaryDescription";
import {GridCharacteristics} from "../../molecules/GridList/GridCharacteristics";
import {CreateAd} from "../../organisms/ad/CreateAd";
import {CreateAdTemplate} from "../../templates/ad/CreateAdTemplate/CreateAdTemplate";

const itemsData = [
    {
        img: 'http://127.0.0.1:8000/static/images/2020-12-14_23-51.png',
        title: 'Breakfast',
    },
    {
        img: 'http://127.0.0.1:8000/media/1546366.jpg',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
    },
    {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
    },
    {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Tomato basil',
    },
    {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        title: 'Sea star',
    },
    {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike',
    },
];

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: '#f5f5f5'
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
    const [openLoadingDialog, setOpenLoadingDialog] = useState(false);

    const {list_items, paginator} = state.dataItems;
    console.log('state.selectedSearchResult', state.selectedSearchResult);
    console.log('state.dataItems', state.dataItems);
    console.log('state.dashboardSubComponent', state.dashboardSubComponent);
    console.log('state.adObject', state.adObject);


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

    const onCloseLoadingDialog = () => {
        console.log('onCloseLoadingDialog');
    };

    const handleOnSearchChange = (selectedSearchResult) => {

        if (selectedSearchResult) {

            setOpenLoadingDialog(true);

            dispatch({
                type: Constants.APP_CONTEXT_ACTION_SET_SELECTED_SEARCH_RESULT,
                payload: selectedSearchResult
            });

            requestGetAds(selectedSearchResult, 1).then(response => {
                setOpenLoadingDialog(false);
                console.log('handleOnSearchChange.requestGetAds.response.data', response.data);
                dispatch({
                    type: Constants.APP_CONTEXT_ACTION_SET_DATA_ITEMS,
                    payload: response.data
                });
            });
        }
    };

    const handleOnPaginationChange = (event, page) => {
        setOpenLoadingDialog(true);
        requestGetAds(state.selectedSearchResult, page).then(response => {
            setOpenLoadingDialog(false);
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

                {state.dashboardSubComponent === Constants.DASHBOARD_SUB_COMPONENT_SEARCH_ADS &&
                <SearchTemplate
                    operationTypeSelector={<OperationType handleOnChange={(value) => {
                        console.log('Dashboard.SearchTemplate.operationTypeSelector.OperationType.handleOnChange')
                    }}/>}
                    propertyTypeSelector={<PropertyType handleOnChange={(value) => {
                        console.log('Dashboard.SearchTemplate.propertyTypeSelector.PropertyType.handleOnChange')
                    }}/>}
                    searchInput={
                        <SearchAsynchronous
                            url={Constants.URL_API_SEARCH_CITY_NEIGHBORHOOD}
                            handleOnChange={handleOnSearchChange}
                            label={"Search neighborhood or city"}/>
                    }
                />
                }

                {state.dashboardSubComponent === Constants.DASHBOARD_SUB_COMPONENT_SEARCH_ADS && !!list_items.length && !!paginator &&
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
                />
                }

                {state.dashboardSubComponent === Constants.DASHBOARD_SUB_COMPONENT_VIEW_AD && state.adObject &&
                <ViewAdTemplate
                    CardViewImage={
                        // <CardViewImage img={itemsData[0].img}/>
                        <CardViewImage img={state.adObject.resources[0].file_path}/>
                    }
                    GridListImageSelector={
                        // <GridListImageSelector itemsData={itemsData}/>
                        <GridListImageSelector itemsData={state.adObject.resources}/>
                    }
                    CardViewMainDescription={
                        <CardViewMainDescription ad={state.adObject}/>
                    }
                    CardViewSecondaryDescription={
                        <CardViewSecondaryDescription ad={state.adObject}/>
                    }
                    GridCharacteristics={
                        <GridCharacteristics ad={state.adObject}/>
                    }
                />
                }

                {state.dashboardSubComponent === Constants.DASHBOARD_SUB_COMPONENT_CREATE_AD &&
                <CreateAdTemplate createAd={
                    <CreateAd/>
                }/>
                }

            </main>
            <LoadingDialog
                dialogContentText={Constants.MESSAGE_LOADING_ADS}
                onClose={onCloseLoadingDialog}
                open={openLoadingDialog}
                dialogTitle={Constants.TITLE_LOADING_DIALOG}
            />
        </div>
    );
}