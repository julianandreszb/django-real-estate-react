import axios from "axios";
import * as Constants from "../../Constants";
import {getCookie} from "../../Utils";
import PropTypes from "prop-types";

/**
 *
 * @returns Promise
 */
async function requestGetAdById(requestData) {

    console.log('requestGetAdById.requestData', requestData);

    if (!requestData) {
        return {};
    }

    return axios({
        method: 'get',
        url: `${Constants.URL_API_SEARCH_AD_BY_ID}/${requestData.id}`,
        data: {},
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
        }
    });
}


requestGetAdById.propTypes = {
    "id": PropTypes.number.isRequired
};

export {requestGetAdById};