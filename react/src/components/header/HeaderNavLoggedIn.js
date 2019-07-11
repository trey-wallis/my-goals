import React, { Component } from 'react';

import RootStore from '../../store/RootStore';
import {observer} from 'mobx-react';
import './HeaderNavLoggedIn.css';

class HeaderNavLoggedIn extends Component {

	handleLogout(){
		RootStore.store.domain.postLogout();
	}

	render(){
		return (
			<div className="HeaderNav d-flex flex-column justify-content-center">
				<li className="nav-item">
					<button className={"nav-link nav-reset-button " + (RootStore.store.ui.isMenuActive("dashboard") ? "active" : "")} onClick={ ()=>{ RootStore.store.ui.currentMenu = "dashboard" }}>Dashboard</button>
				</li>
				<li className="nav-item">
					<button className={"nav-link nav-reset-button " + (RootStore.store.ui.isMenuActive("vision") ? "active" : "")}onClick={ ()=>{ RootStore.store.ui.currentMenu = "vision" }}>Vision</button>
				</li>
				<li className="nav-item">
					<button className={"nav-link nav-reset-button " + (RootStore.store.ui.isMenuActive("goals") ? "active" : "")} onClick={ ()=>{ RootStore.store.ui.currentMenu = "goals" }}>Goals</button>
				</li>
					{ RootStore.store.ui.renderDropDown !== '' ? <li className="nav-item">{RootStore.store.ui.renderDropDown}</li> : '' }
				<li className="nav-item">
					<button className="nav-link nav-reset-button" onClick={ () => { this.handleLogout() }}>Logout</button>
				</li>
			</div>
		);
	}
}

export default observer(HeaderNavLoggedIn);
