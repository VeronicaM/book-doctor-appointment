 // get the mocked version of axios
 import mockAxios from 'axios';

 // Services 
 import AppointmentsService from '../appointments.service.js';
 import EndpointService from '../../../services/endpoint.service.js';
 import mockAppointments from '../../../__mocks__/appointments.mock.js';
 import userMock from '../../../__mocks__/user.mock.js';

 it('should request available slots data from availableSlots endpoint', () => {

     AppointmentsService.getAvailableSlots();

     //availableSlots endpoint
     const URL = EndpointService.buildURL(EndpointService.constants.AVAILABLE_SLOTS);

     expect(mockAxios.get).toHaveBeenCalledTimes(1);
     expect(mockAxios.get).toHaveBeenCalledWith(URL);
 });

 it('should return available slots as an array of objects for given consultant type', () => {
     const availableSlotsData = AppointmentsService.getAvailableSlotPerConsultant(mockAppointments.availableSlots, AppointmentsService.consultantType[0].value);
     expect(availableSlotsData).toEqual(mockAppointments.gpAvailableSlots);
 });

 it('should include at least Another time in the return data if no other time slots available', () => {
     // nurse consultant type doesn't have any available slots
     const availableSlotsData = AppointmentsService.getAvailableSlotPerConsultant(mockAppointments.availableSlots, AppointmentsService.consultantType[2].value);
     const anotherTimeOption = {
         label: 'Another time',
         value: 'anotherTime'
     };

     const includesAnotherOption = availableSlotsData.find((slot) => slot.value === anotherTimeOption.value);
     expect(includesAnotherOption).not.toBe(undefined);
 });


 it('should post new appointment data to create_appointment endpoint', () => {
     const newAppointment = {
         consultant: AppointmentsService.consultantType[0].value,
         time: mockAppointments.gpAvailableSlots[0].value,
         appointment: AppointmentsService.appointmentType[0].value,
         notes: 'testing'
     };

     const postData = {
         dateTime: newAppointment.time,
         notes: newAppointment.notes,
         type: newAppointment.consultant,
         userId: userMock.userData.id
     };

     AppointmentsService.saveAppointment(newAppointment, userMock.userData.id);

     //availableSlots endpoint
     const URL = EndpointService.buildURL(EndpointService.constants.CREATE_APPOINTMENT);

     expect(mockAxios.post).toHaveBeenCalledTimes(1);
     expect(mockAxios.post).toHaveBeenCalledWith(URL, postData);
 });