
import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import RootStore from '../../store/RootStore';

class HeaderNavLoggedOut extends Component {

	render(){
		return (
			<React.Fragment>
      			<li className="nav-item ml-auto">
      				<Link to={'/login'} className={"nav-link" + RootStore.store.ui.isNavItemActive(1)}>Login</Link>
      			</li>
      			<li className="nav-item ml-auto">
        			<Link to={'/register'} className={"nav-link" + RootStore.store.ui.isNavItemActive(2)}>Register</Link>
      			</li>
	      	</React.Fragment>
		);
	}
}

export default HeaderNavLoggedOut;