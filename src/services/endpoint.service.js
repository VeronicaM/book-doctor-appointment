import { API_ENDPOINT } from '../config'

const endpointUrls = {
    availableSlots: `${API_ENDPOINT}/availableSlots`,
    createAppointment: `${API_ENDPOINT}/appointments`,
    user: `${API_ENDPOINT}/users/:uid`
};

const endpointNames = {
    AVAILABLE_SLOTS: 'availableSlots',
    CREATE_APPOINTMENT: 'createAppointment',
    USER: 'user'
};

const buildURL = (endpointName = '', params = {}) => {
    // return empty string if no endpoint name passed
    if (endpointName === '') return '';

    let urlWithParams = endpointUrls[endpointName];

    // replace params specified as :paramName in the endpoint URL with corresponding values
    Object.entries(params).forEach(([paramName, paramValue]) => {
        urlWithParams = urlWithParams.replace(`:${paramName}`, paramValue);
    });

    return urlWithParams;
};

export default {
    buildURL,
    constants: endpointNames
};