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

    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

    return axios({
        method: 'post',
        url: Constants.URL_API_REQUEST_ACCESS_TOKEN,
        data: {
            "grant_type": "password",
            //"username": data.username, // email is used as username
            "username": data.email,
            "password": data.password,
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET
        }
    });
}

export function requestValidateUser() {

}

/**
 *
 * @returns {Promise<unknown>|AxiosPromise}
 */
export function requestRevokeToken() {

    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
    const token = getAccessTokenLocalStorage();

    if (!!token) {
        return axios({
            method: 'post',
            url: Constants.URL_API_REQUEST_REVOKE_TOKEN,
            data: {
                "token": token,
                "client_id": CLIENT_ID,
                "client_secret": CLIENT_SECRET
            }
        });
    } else {
        return new Promise((resolve, reject) => {
            reject({
                "error": "invalid token",
                "token": token
            });
        });
    }
}

/**
 *
 * @returns {Promise<unknown>|AxiosPromise}
 */
export function requestValidateToken() {

    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
    const token = getAccessTokenLocalStorage();

    if (!!token) {
        return axios({
            method: 'post',
            url: Constants.URL_API_REQUEST_REVOKE_TOKEN,
            data: {
                "token": token,
                "client_id": CLIENT_ID,
                "client_secret": CLIENT_SECRET
            }
        });
    } else {
        return new Promise((resolve, reject) => {
            reject({
                "error": "invalid token",
                "token": token
            });
        });
    }
}

export function saveAccessTokenLocalStorage(accessTokenData) {
    const {access_token, refresh_token} = accessTokenData;

    console.log('saveAccessTokenLocalStorage.access_token', access_token);
    console.log('saveAccessTokenLocalStorage.refresh_token', refresh_token);

    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
}

export function removeAccessTokenLocalStorage() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
}

export function saveUserLocalStorage(userData) {
    const {email,first_name,last_name,password,username} = userData;

    localStorage.setItem('email', email);
    localStorage.setItem('first_name', first_name);
    localStorage.setItem('last_name', last_name);
    localStorage.setItem('password', password);
    localStorage.setItem('username', username);
}

export function getUserLocalStorage(){
    const email = localStorage.getItem('email');
    const first_name = localStorage.getItem('first_name');
    const last_name = localStorage.getItem('last_name');
    const password = localStorage.getItem('password');
    const username = localStorage.getItem('username');

    return {email, first_name, last_name, password, username};
}

export function getAccessTokenLocalStorage() {
    return localStorage.getItem('access_token') || '';
}