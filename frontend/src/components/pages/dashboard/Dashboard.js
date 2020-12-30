import React, {useContext, useState} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
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
import {MainListItems, SecondaryListItems} from "./listItems";
import Alert from "@material-ui/lab/Alert";
import Container from "@material-ui/core/Container";
import {MyAdsTemplate} from "../../templates/ad/MyAdsTemplate/MyAdsTemplate";
import {MyAdsListCardItems} from "../../organisms/list/MyAdsListCardItems";
import {EditAd} from "../../organisms/ad/EditAd";
import {EditAdTemplate} from "../../templates/ad/EditAdTemplate/EditAdTemplate";

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
    const [open, setOpen] = useState(true);
    const [showAlertNoResult, setShowAlertNoResult] = useState(false);
    const [openLoadingDialog, setOpenLoadingDialog] = useState(false);
    const [operationTypeId, setOperationTypeId] = useState(1);
    const [propertyTypeId, setPropertyTypeId] = useState(1);
    const [searchAsynchronousDefaultValue] = useState({'label': ''});

    const {list_items, paginator} = state.dataItems;
    console.log('state.selectedSearchResult', state.selectedSearchResult);
    console.log('state.dataItems', state.dataItems);
    console.log('state.dashboardSubComponent', state.dashboardSubComponent);
    console.log('state.adObject', state.adObject);
    // console.log('state.operationType', state.operationType);


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
        setOpenLoadingDialog(true);

        setTimeout(() => {
            removeAccessTokenLocalStorage();
            dispatch({
                type: Constants.APP_CONTEXT_ACTION_SET_IS_LOGGED_IN,
                payload: false
            });

            setOpenLoadingDialog(false);

        }, 1000);

    };

    const onCloseLoadingDialog = () => {
        console.log('onCloseLoadingDialog');
    };

    const handleOnSearchChange = (selectedSearchResult) => {

        dispatch({
            type: Constants.APP_CONTEXT_ACTION_SET_SELECTED_SEARCH_RESULT,
            payload: {}
        });

        if (selectedSearchResult) {

            setOpenLoadingDialog(true);

            dispatch({
                type: Constants.APP_CONTEXT_ACTION_SET_SELECTED_SEARCH_RESULT,
                payload: selectedSearchResult
            });

            requestGetAds(selectedSearchResult, operationTypeId, propertyTypeId, 1).then(response => {
                setOpenLoadingDialog(false);
                console.log('handleOnSearchChange.requestGetAds.response.data', response.data);
                dispatch({
                    type: Constants.APP_CONTEXT_ACTION_SET_DATA_ITEMS,
                    payload: response.data
                });

                setShowAlertNoResult(!!!response.data.list_items.length)

            });
        }
    };

    const handleOnPaginationChange = (event, page) => {
        setOpenLoadingDialog(true);
        requestGetAds(state.selectedSearchResult, operationTypeId, propertyTypeId, page).then(response => {
            setOpenLoadingDialog(false);
            console.log('handleOnPaginationChange.requestGetAds.response.data', response.data);
            dispatch({
                type: Constants.APP_CONTEXT_ACTION_SET_DATA_ITEMS,
                payload: response.data
            });
        });
    };

    const handleOnChangeOperationType = (value) => {

        console.log('handleOnChangeOperationType.value', value);

        setOperationTypeId(value);
    };

    const handleOnChangePropertyType = (value) => {
        console.log('handleOnChangePropertyType.value', value);
        // dispatch({
        //     type: Constants.APP_CONTEXT_ACTION_SET_PROPERTY_TYPE,
        //     payload: value
        // });
        setPropertyTypeId(value);
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
                        {state.dashboardSubComponentTitle}
                    </Typography>
                    {/*<IconButton color="inherit">*/}
                    {/*    <Badge badgeContent={4} color="secondary">*/}
                    {/*        <NotificationsIcon/>*/}
                    {/*    </Badge>*/}
                    {/*</IconButton>*/}
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
                {<MainListItems/>}
                {/*<Divider/>*/}
                {/*{<SecondaryListItems/>}*/}
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>

                {state.dashboardSubComponent === Constants.DASHBOARD_SUB_COMPONENT_SEARCH_ADS &&
                <SearchTemplate
                    operationTypeSelector={
                        <OperationType handleOnChange={handleOnChangeOperationType} defaultValue={operationTypeId}/>
                    }
                    propertyTypeSelector={
                        <PropertyType handleOnChange={handleOnChangePropertyType} defaultValue={propertyTypeId}/>
                    }
                    searchInput={
                        <SearchAsynchronous
                            url={Constants.URL_API_SEARCH_CITY_NEIGHBORHOOD}
                            handleOnChange={handleOnSearchChange}
                            label={"Search by neighborhood or city"}
                            defaultValue={searchAsynchronousDefaultValue}
                        />
                    }
                />
                }

                {showAlertNoResult &&
                state.dashboardSubComponent === Constants.DASHBOARD_SUB_COMPONENT_SEARCH_ADS &&
                <Container maxWidth={false}>
                    <Alert severity="info">No results were found.</Alert>
                </Container>
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

                {/*{state.dashboardSubComponent === Constants.DASHBOARD_SUB_COMPONENT_MY_ADS && !!list_items.length && !!paginator &&*/}
                {state.dashboardSubComponent === Constants.DASHBOARD_SUB_COMPONENT_MY_ADS &&
                <MyAdsTemplate
                    listCardItems={
                        <MyAdsListCardItems/>
                    }
                    //TODO IMPLEMENT PAGINATION
                    // pagination={
                    //     <Pagination
                    //         count={paginator.num_pages}
                    //         page={paginator.number}
                    //         size="large"
                    //         color="primary"
                    //         onChange={handleOnPaginationChange}
                    //     />
                    // }
                />
                }

                {state.dashboardSubComponent === Constants.DASHBOARD_SUB_COMPONENT_EDIT_AD && state.adObject &&
                <EditAdTemplate EditAd={<EditAd/>}/>
                }

                {state.dashboardSubComponent === Constants.DASHBOARD_SUB_COMPONENT_VIEW_AD && state.adObject &&
                <ViewAdTemplate
                    CardViewImage={
                        <CardViewImage itemsData={state.adObject.resources}/>
                    }
                    GridListImageSelector={
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