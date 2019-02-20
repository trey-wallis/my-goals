import React, {Component} from 'react';
import {observer} from 'mobx-react';

import Scrollable from '../components/Scrollable';
import RootStore from '../store/RootStore';

class Header extends Component {
	
	constructor(){
		super();
		let {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
	}

	/*
	* Logged out event handlers
	*/
	onHome = () => {
		this.ui.changeMenu("title", 0);
	}

	onLogin = () => {
		this.ui.changeMenu("login", 1);
	}

	onRegister = () => {
		this.ui.changeMenu("register", 2);
	}

	onLogout = () => {
		this.domain.postLogout();
	}

	/*
	* Logged in event handlers
	*/

	onDashBoard = () => {
		this.ui.changeMenu("dash", 0, false);
	}

	onVisionBoard = () => {
		this.ui.updateDropDownMenu();
		this.ui.changeMenu("vision", 1);
	}

	onViewAll = () => {
		this.ui.dropDownMenuActive = -1;
	}

	onGoals = () => {
		this.ui.changeMenu("goals", 2);
	}

	onHabits= () => {
		this.ui.changeMenu("habits", 3);
	}

	onSettings = () => {
		this.ui.changeMenu("settings", 4);
	}

	renderDropDownMenu(){
			return (<div className="btn-group">
					<button type="button" className="btn btn--reset dropdown-toggle" data-toggle="dropdown" id="navbar-dropdown">{this.ui.dropDownMenuTitle}</button>
					<div className="dropdown-menu">
						{
							this.domain.visionCategories.length > 0 ?
								<Scrollable height="100px">
								{
									this.ui.dropDownMenuItems.map((item, i) => {
										return <button key={i} className={this.ui.isDropDownMenuItemActive(i) + " dropdown-item"} onClick={()=>{this.ui.dropDownMenuActive = i}}>{this.ui.dropDownMenuItems[i]}</button>
									})
								}
								</Scrollable> : ''
						}
						<div className="dropdown-divider"></div>
						<button type="button" className="dropdown-item" onClick={this.onViewAll}>View All</button>
				    	<div className="dropdown-divider"></div>
				    	<button type="button" className="dropdown-item" data-toggle="modal" data-target="#modal-add-vision-category">Add Category</button>
				    	<button type="button" className="dropdown-item" data-toggle="modal" data-target="#modal-add-vision-item">Add Vision Item</button>
				    	<button type="button" className="dropdown-item" data-toggle="modal" data-target="#modal-edit">Edit</button>
					</div>
				</div>);
	}

	renderLoggedIn(){
		return(
			<nav className="navbar navbar-expand-md navbar-dark bg-primary" id="navbar-top">

				{this.ui.displayDropDownMenu ? this.renderDropDownMenu() : 
					<button className="navbar-brand btn--reset" onClick={this.onDashBoard}>My Goals</button>}
				{this.domain.displayName}
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-main">
    				<span className="navbar-toggler-icon"></span>
  				</button>
  				<div className="collapse navbar-collapse" id="navbar-main">
    				<ul className="navbar-nav ml-auto">
    				    <li className={this.ui.isNavMenuItemActive(0) + " nav-item ml-auto"}>
	        				<button className="nav-link btn--reset" onClick={this.onDashBoard}>Dashboard</button>
	      				</li>
	      				<li className={this.ui.isNavMenuItemActive(1) + " nav-item ml-auto"}>
	        				<button className="nav-link btn--reset" onClick={this.onVisionBoard}>Vision Board</button>
	      				</li>
	      				<li className={this.ui.isNavMenuItemActive(2) + " nav-item ml-auto"}>
	        				<button className="nav-link btn--reset" onClick={this.onGoals}>Goals</button>
	      				</li>
	      				<li className={this.ui.isNavMenuItemActive(3) + " nav-item ml-auto"}>
	        				<button className="nav-link btn--reset" onClick={this.onHabits}>Habits</button>
	      				</li>
	      				<li className={this.ui.isNavMenuItemActive(4) + " nav-item ml-auto"}>
	        				<button className="nav-link btn--reset" onClick={this.onSettings}>Settings</button>
	      				</li>
	      				<li className={this.ui.isNavMenuItemActive(5) + " nav-item ml-auto"}>
	        				<button className="nav-link btn--reset" onClick={this.onLogout}>Logout</button>
	      				</li>
    				</ul>
    			</div>
    		</nav>);
	}

	renderLoggedOut(){
		return(
			<nav className="navbar navbar-expand-md navbar-dark bg-primary" id="navbar-top">
			    <button className="navbar-brand btn--reset" onClick={this.onHome}>My Goals</button>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-main">
    				<span className="navbar-toggler-icon"></span>
  				</button>
  				<div className="collapse navbar-collapse" id="navbar-main">
    				<ul className="navbar-nav ml-auto">
      					<li className={this.ui.isNavMenuItemActive(1) + " nav-item ml-auto"}>
        					<button className="nav-link btn--reset" onClick={this.onLogin}>Login</button>
      					</li>
      					<li className={this.ui.isNavMenuItemActive(2) + " nav-item ml-auto"}>
        					<button className="nav-link btn--reset" onClick={this.onRegister}>Register</button>
      					</li>
    				</ul>
    			</div>
    		</nav>);
	}

	render() {
		const {ui, domain} = RootStore.store;
		return (
			<div className="Header">
			{
				(domain.loggedIn ? this.renderLoggedIn() : this.renderLoggedOut())
			}
			</div>
		);
	}
}

export default observer(Header);