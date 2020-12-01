export const APP_TITLE_NAME = 'RealState';

//region "AppContext" - DISPATCH ACTIONS
export const APP_CONTEXT_ACTION_SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const APP_CONTEXT_ACTION_RESET = 'RESET';
export let APP_CONTEXT_ACTION_SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
//endregion

//region PAGES COMPONENT NAMES
export const HOME_WINDOW_NAME = 'home';
export const SIGN_UP_WINDOW_NAME = 'signUp';
export const LOG_IN_WINDOW_NAME = 'logIn';
//endregion

//region API URLS
export const URL_API_CREATE_USER = 'api/user/create';
export const URL_API_LOGIN_USER = 'api/user/login';

export const URL_API_OPERATION_TYPES = 'api/operation_types';
export const URL_API_PROPERTY_TYPES = 'api/property_types';
export const URL_API_SEARCH_CITY_NEIGHBORHOOD = 'api/search_city_neighborhood';

export const URL_API_REQUEST_ACCESS_TOKEN = 'o/token/';
export const URL_API_REQUEST_REVOKE_TOKEN = 'o/revoke_token/';
//endregion

//region MESSAGES
export const TITLE_LOADING_DIALOG = 'Please Wait';
export const TITLE_ALERT_DIALOG_ERROR_CREATING_NEW_USER = 'Error creating new user';
export const MESSAGE_CREATING_NEW_USER = 'Creating new user';
//endregion