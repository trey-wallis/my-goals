import React, { Component } from 'react';

import {observer} from 'mobx-react';
import RootStore from '../../store/RootStore';
import HeaderLoggedIn from './HeaderLoggedIn';
import HeaderLoggedOut from './HeaderLoggedOut';

class HeaderContainer extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand-md navbar-dark bg-primary" id="navbar-top">
				{RootStore.store.ui.renderDropDown}
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-main">
    				<span className="navbar-toggler-icon"></span>
  				</button>
  				<div className="collapse navbar-collapse" id="navbar-main">
    				<ul className="navbar-nav ml-auto">
							{RootStore.store.domain.connection.connected ? 
						<HeaderLoggedIn/> : <HeaderLoggedOut/>}
			   		</ul>
   				</div>
  			</nav>
		);
	}
}

export default observer(HeaderContainer);