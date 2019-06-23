import React from 'react';

// CSS
import './BookAppointmentForm.scss';

// Utilities
import classNames from 'classnames';

const AppointmentFormRow = ({icon, title, children}) => {
	const iconClasses = classNames(icon, 'form-row__icon');

	return (<div className="form-row__container"> 
		<div className="form-row__header"> 
			<i className={iconClasses} />
			<div> {title} </div>
		</div>
		{children}
	</div>);
};

export default AppointmentFormRow;
