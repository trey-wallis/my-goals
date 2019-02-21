import React, {Component, Fragment} from 'react';
import {observer} from 'mobx-react';

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
		this.ui.changeMenu("dash", 0);
		this.ui.changeDropDownMenu("brand");
	}

	onVisionBoard = () => {
		this.ui.updateDropDownMenu();
		this.ui.changeMenu("vision", 1);
		this.ui.changeDropDownMenu("vision", "My Vision");
	}

	onViewAll = () => {
		this.ui.dropDownMenuActive = -1;
	}

	onGoals = () => {
		this.ui.changeMenu("goals", 2);
		this.ui.changeDropDownMenu("goals", "My Goals");
		
		if (this.domain.visionCategories.length > 0){
			this.domain.addGoalCategoryId = this.domain.visionCategories[0].id;
		}
		const items = this.domain.visionItems.filter(item => {
			return item.categoryid === this.domain.addGoalCategoryId;
		});
		if (items.length > 0){
			this.domain.addGoalVisionItemId = items[0].id;
		}
	}

	onHabits= () => {
		this.ui.changeMenu("habits", 3);
		this.ui.changeDropDownMenu("habits", "My Habits");
	}

	onSettings = () => {
		this.ui.changeMenu("settings", 4);
		this.ui.changeDropDownMenu("brand");
	}

	renderLoggedIn(){
		return(
			<nav className="navbar navbar-expand-md navbar-dark bg-primary" id="navbar-top">
				{this.ui.dropDown}
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
		return (
			<Fragment>
			{
				(this.domain.loggedIn ? this.renderLoggedIn() : this.renderLoggedOut())
			}
			</Fragment>
		);
	}
}

export default observer(Header);