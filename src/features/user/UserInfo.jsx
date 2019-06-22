import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// CSS
import './UserInfo.scss';

const UserInfo = ({ userData }) => {
    return (<div className="user-info__container" > 
		<div className="user-info__avatar-container"> 
			<img className="user-info__avatar-img" src={userData.avatar} /> 
			<div className="user-info__name"> 
				{userData.firstName} {userData.lastName}
			</div>
		</div>
		<div className="user-info__cta"> Change </div> 
	</div>);
};

UserInfo.propTypes = {
    userData: PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired
    })
};

export default UserInfo;
