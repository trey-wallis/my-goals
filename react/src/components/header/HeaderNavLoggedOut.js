
import React, { Component } from 'react';

import {observer} from 'mobx-react';
import RootStore from '../../store/RootStore';

class HeaderNavLoggedOut extends Component {

	render(){
		return (
			<React.Fragment>
      			<li className="nav-item ml-auto">
							<button className={"nav-link nav-reset-button " + (RootStore.store.ui.isMenuActive("login") ? "active" : "")} onClick={ ()=>{ RootStore.store.ui.currentMenu = "login" }}>Login</button>
      			</li>
      			<li className="nav-item ml-auto">
							<button className={"nav-link nav-reset-button " + (RootStore.store.ui.isMenuActive("register") ? "active" : "")} onClick={ ()=>{ RootStore.store.ui.currentMenu = "register" }}>Register</button>
      			</li>
	      	</React.Fragment>
		);
	}
}

export default observer(HeaderNavLoggedOut);
