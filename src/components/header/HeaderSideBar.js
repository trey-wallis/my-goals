import React, { Component } from 'react';

import RootStore from '../../store/RootStore';

import './HeaderSideBar.css';
import HeaderNavLoggedIn from './HeaderNavLoggedIn';

class HeaderSideBar extends Component {

	render(){
		return (
			<div className="sidebar bg-primary">
				<h4 className="title">My Goals</h4>
				<div className="nav flex-column align-items-center">
					<HeaderNavLoggedIn/>
				</div>
			</div>
		);
	}
}

export default HeaderSideBar;