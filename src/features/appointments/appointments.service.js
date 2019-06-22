// Services
import EndpointService from '../../services/endpoint.service.js';

// Constants
const consultantTypes = [{ 
  code: 'gp', 
  label: 'GP', 
  description: 'Babylon GP'
}, { 
  code: 'specialist', 
  label: 'Specialist', 
  description: 'Specialist'
}, { 
  code: 'nurse', 
  label: 'Nurse', 
  description: 'Nurse'
}, { 
  code: 'therapist', 
  label: 'Therapist', 
  description: 'Therapist'
}, { 
  code: 'triageNurse', 
  label: 'Triage Nurse', 
  description: 'Triage Nurse'
}];


const getAvailableSlots = () => {
     const URL = EndpointService.buildURL(EndpointService.constants.AVAILABLE_SLOTS);
     return fetch(URL).then(res => res.json());
 };


export default {
   consultantTypes,
   getAvailableSlots
};
