import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import RootStore from '../../store/RootStore';

import './HeaderSideBar.css';

class HeaderSideBar extends Component {

	render(){
		return (
			<div className="sidebar">
				<h1>My Goals</h1>
				<ul>
					<li>DashBoard</li>
					<li>Vision Board</li>
					<li>Goals</li>
					<li>Calendar</li>
					<li>Settings</li>
				</ul>
			</div>
		);
	}
}

export default HeaderSideBar;