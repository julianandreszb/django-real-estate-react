import React, {createContext, useEffect, useReducer, useState} from "react";
import * as Constants from './Constants'
import {getAccessTokenLocalStorage, getUserLocalStorage} from "./Utils";
import axios from "axios";

//Argument type {currentPage: Requireable<string> | string | string} is not assignable to parameter type (arg: {currentPage: string}) => ReducerStateWithoutAction<reducer>
const AppContext = createContext({});


const init = (initialValues) => {
    console.log('init.initialValues', initialValues);
    return initialValues;
};

// https://reactjs.org/docs/hooks-reference.html#usereducer
const reducer = (state, action) => {
    try {
        switch (action.type) {

            case Constants.APP_CONTEXT_ACTION_SET_CURRENT_PAGE:
                return {...state, currentPage: action.payload};

            case Constants.APP_CONTEXT_ACTION_SET_DASHBOARD_SUB_COMPONENT:
                return {...state, dashboardSubComponent: action.payload};

            case Constants.APP_CONTEXT_ACTION_SET_IS_LOGGED_IN:
                return {...state, isLoggedIn: action.payload};

            case Constants.APP_CONTEXT_ACTION_SET_DATA_ITEMS:
                return {...state, dataItems: action.payload};

            case Constants.APP_CONTEXT_ACTION_SET_SELECTED_SEARCH_RESULT:
                return {...state, selectedSearchResult: action.payload};

            case Constants.APP_CONTEXT_ACTION_SET_AD_OBJECT:
                return {...state, adObject: action.payload};

            case Constants.APP_CONTEXT_ACTION_SET_TOKEN:
                return {...state, token: action.payload};

            // case Constants.APP_CONTEXT_ACTION_SET_AUTOCOMPLETE_OPTION:
            //     return {...state, autocompleteOption: action.payload};

            case Constants.APP_CONTEXT_ACTION_RESET:
                return init(action.payload);

            // default:
            //     throw new Error();
        }
    } catch (e) {
        console.log('reducer.e', e)

    }

};


// Create a provider for components to consume and subscribe to changes
const AppContextProvider = props => {
    console.log('AppContextProvider.props', props);

    const user = getUserLocalStorage();
    //TODO validate user exists

    const token = getAccessTokenLocalStorage();
    //TODO validate token

    const dataItems = {
        list_items: [],
        paginator: {}
    };

    const initialValues = {
        currentPage: Constants.HOME_WINDOW_NAME,
        dashboardSubComponent: Constants.DASHBOARD_SUB_COMPONENT_SEARCH_ADS,
        // dashboardSubComponent: Constants.DASHBOARD_SUB_COMPONENT_CREATE_AD,
        isLoggedIn: !!token,
        token: token,
        dataItems: dataItems,
        selectedSearchResult: {},
        adObject: {},
    };

    useEffect(() => {


    });

    const [state, dispatch] = useReducer(reducer, initialValues, init);

    return (
        <AppContext.Provider value={[state, dispatch]}>
            {props.children}
        </AppContext.Provider>
    );
};

export {AppContext, AppContextProvider}