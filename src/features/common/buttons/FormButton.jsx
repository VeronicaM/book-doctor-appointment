import React from 'react';
import PropTypes from 'prop-types';

// Utilities
import classNames from 'classnames';

// CSS
import './FormButton.scss';

const FormButton = React.memo(({ text, fieldName, value, onClickAction, isSelected }) => {
	const handleClick = (event) => {
		onClickAction(fieldName, value);
	};

	const btnClasses = classNames('btn form-btn', {
		'form-btn--selected': isSelected 
	});

	return <button className={btnClasses} onClick={handleClick}> 
		{text} 
	</button>
});

FormButton.propTypes = {
	text: PropTypes.string.isRequired,
	onClickAction: PropTypes.func.isRequired,
	isSelected: PropTypes.bool ,
	value: PropTypes.string.isRequired,
	fieldName: PropTypes.string.isRequired
};

FormButton.defaultProps = {
	isSelected: false
}

export default FormButton;
