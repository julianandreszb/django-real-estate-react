import axios from "axios";
import * as Constants from "../../Constants";
import {getCookie} from "../../Utils";

/**
 *
 * @returns Promise
 */
export async function requestGetAds(requestData) {

    console.log('requestGetAds.requestData', requestData);

    return axios({
        method: 'get',
        url: `${Constants.URL_API_SEARCH_ADS}/${requestData.search_type.toLowerCase()}/${requestData.id}`,
        data: {

        },
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
        }
    });
}