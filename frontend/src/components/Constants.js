export let APP_CONTEXT_ACTION_SET_DASHBOARD_SUB_COMPONENT_TITLE = 'SET_DASHBOARD_SUB_COMPONENT_TITLE';


export const APP_TITLE_NAME = 'RealState';

//region "AppContext" - DISPATCH ACTIONS
export const APP_CONTEXT_ACTION_SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const APP_CONTEXT_ACTION_SET_DASHBOARD_SUB_COMPONENT = 'SET_DASHBOARD_SUB_COMPONENT';
export const APP_CONTEXT_ACTION_RESET = 'RESET';
export const APP_CONTEXT_ACTION_SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
export const APP_CONTEXT_ACTION_SET_AUTOCOMPLETE_OPTION = 'SET_AUTOCOMPLETE_OPTION';
export const APP_CONTEXT_ACTION_SET_DATA_ITEMS = 'SET_LIST_ITEMS';
export const APP_CONTEXT_ACTION_SET_SELECTED_SEARCH_RESULT = 'SET_SELECTED_SEARCH_RESULT';
export const APP_CONTEXT_ACTION_SET_AD_OBJECT = 'SET_AD_OBJECT';
export const APP_CONTEXT_ACTION_SET_TOKEN = 'SET_TOKEN';
export const APP_CONTEXT_ACTION_SET_CARD_VIEW_IMAGE_INDEX = 'SET_CARD_VIEW_IMAGE_INDEX';
export const APP_CONTEXT_ACTION_SET_OPERATION_TYPE = 'SET_OPERATION_TYPE';
export let APP_CONTEXT_ACTION_SET_PROPERTY_TYPE = 'SET_PROPERTY_TYPE';
export let APP_CONTEXT_ACTION_SET_MY_ADS = 'SET_MY_ADS';
//endregion

//region PAGES COMPONENT NAMES
export const HOME_WINDOW_NAME = 'dashboard';
export const SIGN_UP_WINDOW_NAME = 'signUp';
export const LOG_IN_WINDOW_NAME = 'logIn';
//endregion

//region DASHBOARD SUB-COMPONENT
export const DASHBOARD_SUB_COMPONENT_VIEW_AD = 'viewAd';
export const DASHBOARD_SUB_COMPONENT_SEARCH_ADS = 'searchAds';
export const DASHBOARD_SUB_COMPONENT_CREATE_AD = 'createAd';
export const DASHBOARD_SUB_COMPONENT_EDIT_AD = 'editAd';
export const DASHBOARD_SUB_COMPONENT_MY_ADS = 'myAds';
//endregion

//region DASHBOARD SUB-COMPONENT DEFAULT TITLES
export const DASHBOARD_SUB_COMPONENT_TITLE_SEARCH_ADS = 'Search ADS';
export const DASHBOARD_SUB_COMPONENT_TITLE_CREATE_AD = 'Create AD';
export const DASHBOARD_SUB_COMPONENT_TITLE_MY_ADS = 'My ADS';
//endregion

//region API URLS
export const URL_API_CREATE_USER = 'api/user/create';
export const URL_API_LOGIN_USER = 'api/user/login';
export const URL_API_CREATE_AD = 'api/ad/create';
export const URL_API_EDIT_AD = 'api/ad/edit';
// export const URL_API_LOGIN_USER = 'api/user/api-token-auth';

export const URL_API_OPERATION_TYPES = 'api/operation_types';
export const URL_API_PROPERTY_TYPES = 'api/property_types';
export const URL_API_SEARCH_CITY_NEIGHBORHOOD = 'api/search_city_neighborhood';
export const URL_API_SEARCH_NEIGHBORHOOD = 'api/search_neighborhood';
export const URL_API_SEARCH_ADS = 'api/search_ads';
export const URL_API_SEARCH_AD_BY_ID = 'api/ad';
export const URL_API_DELETE_AD_BY_ID = 'api/delete_ad';
export const URL_API_MY_ADS = 'api/my_ads';

export const URL_API_REQUEST_ACCESS_TOKEN = 'o/token/';
export const URL_API_REQUEST_REVOKE_TOKEN = 'o/revoke_token/';
//endregion

//region MESSAGES
export const TITLE_LOADING_DIALOG = 'Please wait';
export const TITLE_ALERT_DIALOG_ERROR_CREATING_NEW_USER_TITLE = 'Error creating new user';
export const TITLE_ALERT_DIALOG_ERROR_EMPTY_NEIGHBORHOOD_TITLE = 'Invalid neighborhood';
export const MESSAGE_CREATING_NEW_USER = 'Creating new user';
export const MESSAGE_LOADING_ADS = 'Loading records';
//endregion