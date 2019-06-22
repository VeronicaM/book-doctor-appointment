import React, { Component, Fragment } from 'react';

// Services 
import AppointmentsService from './appointments.service.js';

const defaultAppointment = AppointmentsService.consultantTypes[0];

class BookAppointmentForm extends Component {
    constructor(props) {
    	super(props);
        this.state = {
            userId: 1,
            selectedApointment: defaultAppointment,
            availableSlots: [],
        }
    }

    render() {
    	return (
    		<Fragment> 
    			Book Appointment form
    		</Fragment>
    	);
    }
}


export default BookAppointmentForm;