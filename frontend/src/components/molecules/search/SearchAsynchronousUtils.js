import axios from "axios";
import * as Constants from "../../Constants";
import {getCookie} from "../../Utils";
import PropTypes from "prop-types";

/**
 *
 * @returns Promise
 */
async function requestGetAds(requestData, page) {

    console.log('requestGetAds.requestData', requestData);

    if (!requestData) {
        return {};
    }

    return axios({
        method: 'get',
        url: `${Constants.URL_API_SEARCH_ADS}/${requestData.search_type.toLowerCase()}/${requestData.id}/${page}`,
        data: {},
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
        }
    });
}


requestGetAds.propTypes = {
    "search_type": PropTypes.string.isRequired,
    "id": PropTypes.number.isRequired
};

export {requestGetAds};