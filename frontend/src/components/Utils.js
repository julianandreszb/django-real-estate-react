import axios from "axios";
import * as Constants from "./Constants";

/**
 * Used to get the CSRF Token (Required by Django backend)
 * @param name
 * @returns {null}
 */
export function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

/**
 *
 * @param data
 * @returns {Promise}
 */
export function requestAccessToken(data) {

    return axios({
        method: 'post',
        url: Constants.URL_USER_CREATE,
        data: {
            "grant_type": "password",
            "username": data.username,
            "password": data.password,
        },
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Authorization': `Basic ${token}`
        }
    });
}