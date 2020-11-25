import axios from "axios";
import * as Constants from "../../Constants";
import {getCookie} from "../../Utils";

/**
 *
 * @param data
 * @returns {Promise}
 */
export function requestLogIn(data) {

    return axios({
        method: 'post',
        url: Constants.URL_API_LOGIN_USER,
        data: {
            "username": data.email,
            "password": data.password,
        },
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
        }
    });
}