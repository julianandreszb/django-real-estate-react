import axios from "axios";
import * as Constants from "../../Constants";
import {getCookie} from "../../Utils";
import PropTypes from "prop-types";

/**
 *
 * @returns Promise
 */
async function requestGetAds(requestData, operationTypeId, propertyTypeId, page) {

    console.log('requestGetAds.requestData', requestData);

    if (!requestData) {
        return {};
    }

    //search_ads/<str:search_type>/<int:pk>/<int:operation_type_pk>/<int:property_type_pk>/<int:page>/
    return axios({
        method: 'get',
        url: `${Constants.URL_API_SEARCH_ADS}/${requestData.search_type.toLowerCase()}/${requestData.id}/${operationTypeId}/${propertyTypeId}/${page}`,
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