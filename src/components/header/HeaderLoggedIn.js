import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import RootStore from '../../store/RootStore';

class HeaderLoggedIn extends Component {

	render(){
		return (
			<React.Fragment>
				<li className="nav-item ml-auto">
        			<Link to={'/dashboard'} className={"nav-link" + RootStore.store.ui.isNavItemActive(0)}>Dashboard</Link>
	      		</li>
	      		<li className="nav-item ml-auto">
        			<Link to={'/visionboard'} className={"nav-link" + RootStore.store.ui.isNavItemActive(1)}>Vision Board</Link>
	      		</li>
	      		<li className="nav-item ml-auto">
        			<Link to={'/goals'} className={"nav-link" + RootStore.store.ui.isNavItemActive(2)}>Goals</Link>
	      		</li>
	      		<li className="nav-item ml-auto">
        			<Link to={'/habits'} className={"nav-link" + RootStore.store.ui.isNavItemActive(3)}>Habits</Link>
	      		</li>
	      		<li className="nav-item ml-auto">
        			<Link to={'/settings'} className={"nav-link" + RootStore.store.ui.isNavItemActive(4)}>Settings</Link>
	      		</li>
	      		<li className="nav-item ml-auto">
        			<button className="nav-link btn--reset" onClick={RootStore.store.domain.postLogout}>Logout</button>
	      		</li>
	      	</React.Fragment>
		);
	}
}

export default HeaderLoggedIn;