import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

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
            isLoading: true,
            isError: false
        };

        // keep track of mounted state to prevent setting state on unmounted component
        this.hasMounted = false;
    }

    componentDidMount() {
        this.hasMounted = true;
        this.getAvailableSlotsForCurrentConsultantType();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.appointment.consultant !== this.state.appointment.consultant) {
            this.getAvailableSlotsForConsultantType();
        }
    }

    componentWillUnmount() {
        this.hasMounted = false;
    }

    /**
     * Verifies that the component is mounted before setting the state
     * to avoid getting a warning for setting state on unmounted compoent
     */
    stateSetter = (stateParams) => {
        if (this.hasMounted) {
            this.setState(stateParams);
        }
    };

    getAvailableSlotsForCurrentConsultantType = () => {
        const onError = (error) => {
            this.stateSetter({
                availableSlots: [],
                isLoading: false,
                isError: true
            });
        };

        const onSuccess = (data) => {
            const availableSlotsForConsultant = AppointmentsService.getAvailableSlotPerConsultant(data, this.state.appointment.consultant);

            const updatedAppointment = {
                ...this.state.appointment,
                time: availableSlotsForConsultant[0].value
            };

            this.stateSetter({
                availableSlots: availableSlotsForConsultant,
                appointment: updatedAppointment,
                isLoading: false // hide loading
            });
        };

        // set isLoading flag to true to update UI while waiting for data to render
        this.setState({ isLoading: true });

        AppointmentsService.getAvailableSlots()
            .then(onSuccess)
            .catch(onError);
    };

    updateAppointmentField = (fieldName, fieldValue) => {
        const updatedAppointment = {
            ...this.state.appointment,
            [fieldName]: fieldValue
        };

        this.setState({ appointment: updatedAppointment });
    };

    renderTimeSlots = (renderFn) => {
        if (this.state.isLoading) {
            return <div> Loading available slots...</div>;
        }

        if (this.state.isError) {
            return <div> Failed to load available slots. Please try again later or contact support!</div>;
        }

        if (!this.state.availableSlots.length) {
            return <div> No available slots </div>;
        }

        return this.state.availableSlots.map(renderFn);
    };

    renderNotesField = () => {
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
            case 'time':
                return this.renderTimeSlots(renderFormBtn);
            case 'notes':
                return this.renderNotesField();
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

    saveAppointment = () => {
        const onSuccess = (isSaved) => {
            if(isSaved) {
               return this.stateSetter({ isSuccess: true });     
            }
           
            onError('Could not save');
        };

        const onError = (error) => {
            this.stateSetter({ isError: true });
        };

        AppointmentsService.saveAppointment(this.state.appointment, this.props.userId)
            .then(onSuccess)
            .catch(onError);
    };

    render() {
        const notificationMessage = this.state.isError ?
            <div className="error-msg"> Something went wrong </div> :
            this.state.isSuccess ? <div className="success-msg"> Appointment saved! </div> : null;

        return (
            <Fragment> 
                {this.renderFormRows()}
                <button 
                    className="book-appointment-form__cta" 
                    value="Book"
                    onClick={this.saveAppointment}
                > 
                    Book 
                </button>
                {notificationMessage}
            </Fragment>
        );
    }
}

BookAppointmentForm.propTypes = {
    userId: PropTypes.string.isRequired
};

export default BookAppointmentForm;
