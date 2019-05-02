import React, { Component } from 'react';

import RootStore from '../../store/RootStore';

import {observer} from 'mobx-react';

import HeaderNavLoggedIn from './HeaderNavLoggedIn';
import HeaderNavLoggedOut from './HeaderNavLoggedOut';

import './HeaderNav.css';

class HeaderNav extends Component {

	render(){
		let className = "navbar navbar-expand-md navbar-dark bg-primary";
		if (RootStore.store.domain.connection.connected === true){ //If we're logged in - then hide the nav bar if the window size is md or larger
			className = "navbar navbar-dark bg-primary hide-md";
		}

		return (
			<nav className={className} id="navbar-top">
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-main">
    				<span className="navbar-toggler-icon"></span>
  				</button>
  				<div className="collapse navbar-collapse" id="navbar-main">
    				<ul className="navbar-nav mr-auto">
    					{RootStore.store.domain.connection.connected ? <HeaderNavLoggedIn/> : <HeaderNavLoggedOut/>}
					</ul>
   				</div>
  			</nav> 
		);
	}
}

export default observer(HeaderNav);