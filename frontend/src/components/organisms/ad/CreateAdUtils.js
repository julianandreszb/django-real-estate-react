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
        // data: {
        //     "username": data.email,
        //     "password": data.password,
        // },

        headers: {
            'Authorization': `Bearer ${token}`,
            'X-CSRFToken': getCookie('csrftoken')
        }
    });
}