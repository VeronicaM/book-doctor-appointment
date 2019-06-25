import React, { Component, Fragment } from 'react';

// Services 
import AppointmentsService from './appointments.service.js';

// Custom Components
import AppointmentFormRow from './AppointmentFormRow.jsx';
import FormButton from '../common/buttons/FormButton.jsx';
import FileUploader from '../common/file-uploader/FileUploader.jsx';

// Constants
const defaultAppointment = {
    consultant: AppointmentsService.consultantType[0].value,
    time: null,
    appointment: AppointmentsService.appointmentType[0].value,
    notes: '',
    photo: null
};

class BookAppointmentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointment: defaultAppointment,
            availableSlots: [],
        }
    }

    updateAppointmentField = (fieldName, fieldValue) => {
        const updatedAppointment = {
            ...this.state.appointment,
            [fieldName]: fieldValue
        };

        this.setState({ appointment: updatedAppointment });
    };

    getFormRowChildren = (fieldName) => {
        const renderFormBtn = (data) => {
            const isSelected = data.value === this.state.appointment[fieldName];

            return <FormButton
                        key={data.value}
                        value={data.value}
                        text={data.label}
                        isSelected={isSelected}
                        fieldName={fieldName}
                        onClickAction={this.updateAppointmentField}
                    />;
        };

        switch (fieldName) {
            case 'consultant':
                return AppointmentsService.consultantType.map(renderFormBtn);
            case 'appointment':
                return AppointmentsService.appointmentType.map(renderFormBtn);
            case 'notes':
                const saveNotes = (event) => {
                    const notesValues = event && event.target && event.target.value;
                    this.updateAppointmentField('notes', notesValues);
                };

                return <textarea
                            rows="10"
                            className="book-appointment-form__notes"
                            placeholder="Describe your symptoms" 
                            value={this.state.appointment.notes} 
                            onChange={saveNotes} 
                        />;
            case 'photo':
                 // Dummy File uploader
                 return <FileUploader />
            default:
                return null;
        }
    };

    renderFormRows = () => {
        const renderRow = ({ id, icon, title }) => {
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