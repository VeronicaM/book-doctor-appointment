 // get the mocked version of axios
 import mockAxios from 'axios';

 // React
 import React from 'react';
 import ReactDOM from 'react-dom';

 // Mocks
 import mockAppointments from '../../../__mocks__/appointments.mock.js';
 import mockUser from '../../../__mocks__/user.mock.js';

 import { shallow, mount } from 'enzyme';

 // Components
 import BookAppointmentForm from '../BookAppointmentForm.jsx';
 import AppointmentFormRow from '../AppointmentFormRow.jsx';
 import FormButton from '../../common/buttons/FormButton.jsx';
 import FileUploader from '../../common/file-uploader/FileUploader.jsx';

 // Services
 import AppointmentsService from '../appointments.service.js';

 it('should render Appointment Form Rows', () => {
     const component = shallow(<BookAppointmentForm userId={mockUser.userData.id} />);

     // check that a row is rendered for each corresponding appointments form section
     expect(component.find(AppointmentFormRow).length).toBe(5);

     // check that rows are not empty
     expect(component.find(AppointmentFormRow).isEmpty()).toBe(false);
 });
