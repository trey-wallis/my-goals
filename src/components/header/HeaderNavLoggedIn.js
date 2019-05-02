import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import RootStore from '../../store/RootStore';

class HeaderNavLoggedIn extends Component {

	render(){
		return (
			<React.Fragment>
				<li className="nav-item">
        			<Link to={'/dashboard'} className={"nav-link" + RootStore.store.ui.isNavItemActive(0)}>Dashboard</Link>
	      		</li>
	      		<li className="nav-item">
        			<Link to={'/visionboard'} className={"nav-link" + RootStore.store.ui.isNavItemActive(1)}>Vision Board</Link>
	      		</li>
	      		<li className="nav-item">
        			<Link to={'/goals'} className={"nav-link" + RootStore.store.ui.isNavItemActive(2)}>Goals</Link>
	      		</li>
	      		<li className="nav-item">
        			<Link to={'/calendar'} className={"nav-link" + RootStore.store.ui.isNavItemActive(3)}>Calendar</Link>
	      		</li>
	      		<li className="nav-item">
        			<Link to={'/settings'} className={"nav-link" + RootStore.store.ui.isNavItemActive(4)}>Settings</Link>
	      		</li>
	      		<li className="nav-item">
        			<a className="nav-link" href="#" onClick={RootStore.store.domain.postLogout}>Logout</a>
	      		</li>
	      	</React.Fragment>
		);
	}
}

export default HeaderNavLoggedIn;