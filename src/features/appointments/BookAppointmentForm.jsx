import React, { Component, Fragment } from 'react';

// Services 
import AppointmentsService from './appointments.service.js';

// Custom Components
import AppointmentFormRow from './AppointmentFormRow.jsx';

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

    getFormRowChildren = (rowId) => {
        switch(rowId) {
            case '': 
                return 
            default:
                return null;
        }
    };

    renderFormRows = () => {
        const renderRow = ({id, icon, title}) => {
            return <AppointmentFormRow 
                   key={id} 
                   icon={icon}
                   title={title}  
                > 
                {this.getFormRowChildren(id)} 
            </AppointmentFormRow>;
        };

        return AppointmentsService.formSections.map(renderRow);
    };

    render() {
    	return (
    		<Fragment> 
    			{this.renderFormRows()}
    		</Fragment>
    	);
    }
}


export default BookAppointmentForm;