import React from 'react';

// CSS
import './BookAppointmentForm.scss';

// Utilities
import classNames from 'classnames';

// import classNames from 'classnames';

const AppointmentFormRow = ({icon, title, children}) => {
	const iconClasses = classNames(icon, 'form-row__icon');
	return (<div className="form-row__container"> 
		<div className="form-row__header"> 
			<i className={iconClasses} />
			<div className="form-row__title"> {title} </div>
		</div>
		<div className="form-row__children"> 
			{children}
		</div>
	</div>);
};

export default AppointmentFormRow;
