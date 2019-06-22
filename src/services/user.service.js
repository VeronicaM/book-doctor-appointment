import axios from 'axios';

// Services
import EndpointService from './endpoint.service.js';
import LoggerService from './logger.service.js';

// Constants
const filename = "user.service.js";

const getUserData = (uid = 1) => {
	   const onSuccess = (response) => {
        if (response && response.data) {
            return response.data;
        }

        return onError('Wrong user JSON format!');
    };

    const onError = (error) => {
        // Send error to logging monitoring system
        LoggerService.log({
            message: error,
            type: LoggerService.MESSAGE_TYPES.ERROR,
            filename
        });
    };

    // get user endpoint url with passed in params
	const URL =EndpointService.buildURL(EndpointService.constants.USER, { uid });

	return axios.get(URL); 
};

export default {
	getUserData
};
