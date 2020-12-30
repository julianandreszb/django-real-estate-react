import axios from "axios";
import * as Constants from "../../Constants";
import {getCookie} from "../../Utils";

/**
 *
 * @param data
 * @param token
 * @returns {Promise}
 */
export function requestCreateAd(data, token) {

    return axios({
        method: 'post',
        url: Constants.URL_API_CREATE_AD,
        data: data,
        headers: {
            'Authorization': `Token ${token}`,
            'X-CSRFToken': getCookie('csrftoken')
        }
    });
}

/**
 *
 * @param adId
 * @param data
 * @param token
 * @returns {Promise}
 */
export function requestEditAd(adId, data, token) {

    return axios({
        method: 'post',
        url: `${Constants.URL_API_EDIT_AD}/${adId}`,
        data: data,
        headers: {
            'Authorization': `Token ${token}`,
            'X-CSRFToken': getCookie('csrftoken')
        }
    });
}