import axios from "axios";
import * as Constants from "../../Constants";
import {getCookie} from "../../Utils";
import PropTypes from "prop-types";
import {useContext} from "react";
import {AppContext} from "../../app-context";

/**
 *
 * @returns Promise
 */
async function requestGetMyAds(token) {

    return axios({
        method: 'get',
        url: `${Constants.URL_API_MY_ADS}`,
        data: {},
        headers: {
            'Authorization': `Token ${token}`,
            'X-CSRFToken': getCookie('csrftoken')
        }
    });
}


/**
 *
 * @returns Promise
 */
async function requestDeleteAdById(adId, token) {

    console.log('requestDeleteAdById.adId', adId);

    if (!adId) {
        return {};
    }

    return axios({
        method: 'post',
        url: `${Constants.URL_API_DELETE_AD_BY_ID}/${adId}`,
        data: {},
        headers: {
            'Authorization': `Token ${token}`,
            'X-CSRFToken': getCookie('csrftoken')
        }
    });
}


requestDeleteAdById.propTypes = {
    "adId": PropTypes.number.isRequired,
    "token": PropTypes.string.isRequired
};

export {requestGetMyAds, requestDeleteAdById};