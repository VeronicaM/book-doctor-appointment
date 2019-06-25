import axios from 'axios';

// Services
import EndpointService from '../../services/endpoint.service.js';
import LoggerService from '../../services/logger.service.js';

// Constants
const filename = 'appointments.service.js';

const consultantType = [{
    value: 'gp',
    label: 'GP',
    description: 'Babylon GP'
}, {
    value: 'specialist',
    label: 'Specialist',
    description: 'Specialist'
}, {
    value: 'nurse',
    label: 'Nurse',
    description: 'Nurse'
}, {
    value: 'therapist',
    label: 'Therapist',
    description: 'Therapist'
}, {
    value: 'triageNurse',
    label: 'Triage Nurse',
    description: 'Triage Nurse'
}];

// use separate label as it allows to add internalization easier
const appointmentType = [{
    value: 'video',
    label: 'Video'
}, {
    value: 'audio',
    label: 'Audio'
}];

const formSections = [{
    id: 'consultant',
    icon: 'fa fa-stethoscope',
    title: 'Consultant Type'
}, {
    id: 'time',
    icon: 'fa fa-clock',
    title: 'Date & Time'
}, {
    id: 'appointment',
    icon: 'fa fa-video',
    title: 'Appointment Type'
}, {
    id: 'notes',
    icon: 'fa fa-clipboard',
    title: 'Notes'
}, {
    id: 'photo',
    icon: 'fa fa-images',
    title: 'Attach a photo'
}];

const getAvailableSlots = () => {
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
    const URL = EndpointService.buildURL(EndpointService.constants.AVAILABLE_SLOTS);

    return axios.get(URL)
        .then(onSuccess)
        .catch(onError);
};


export default {
    consultantType,
    formSections,
    getAvailableSlots,
    appointmentType
};