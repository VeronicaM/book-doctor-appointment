import React from 'react';

// Components
import logo from '../../../logo.png';
import './NavBar.scss';

const NavBar = (props) => {
	return(<div className="navbar__container"> 
		<i className="fa fa-bars navbar__menu"></i>
		<img src={logo} className="navbar__logo" alt="Babylon Health" />
		<div className="navbar__badge"> NU </div> 
	</div>); 
};

export default NavBar;
