import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const UserInfo = ({ userData }) => {
    return (<Fragment> 
		<div className="user-info__avatar-container"> 
			<img src={userData.avatar} /> 
			<div className="user-info__name"> 
				{userData.firstName} {userData.lastName}
			</div>
		 </div>
		<div> Change </div> 
	</Fragment>);
};

UserInfo.propTypes = {
    userData: PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired
    })
};

export default UserInfo;
