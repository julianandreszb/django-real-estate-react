import axios from "axios";
import * as Constants from "../../Constants";
import {getCookie} from "../../Utils";

/**
 *
 * @param data
 * @returns {Promise}
 */
export function requestCreateUser(data) {

    return axios({
        method: 'post',
        url: Constants.URL_API_CREATE_USER,
        data: {
            "username": data.email,
            "first_name": data.firstName,
            "last_name": data.lastName,
            "email": data.email,
            "password": data.password,
        },
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
        }
    });
}