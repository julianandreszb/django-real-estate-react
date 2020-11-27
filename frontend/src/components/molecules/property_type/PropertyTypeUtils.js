import axios from "axios";
import * as Constants from "../../Constants";
import {getCookie} from "../../Utils";

/**
 *
 * @returns Promise
 */
export async function requestGetAllPropertyTypes() {

    return axios({
        method: 'get',
        url: Constants.URL_API_PROPERTY_TYPES,
        data: {},
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
        }
    });
}