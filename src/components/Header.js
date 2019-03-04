import React, {Component, Fragment} from 'react';
import {observer} from 'mobx-react';
import $ from 'jquery';

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
		$('.navbar-collapse').collapse('hide');
	}

	onRegister = () => {
		this.ui.changeMenu("register", 2);
		$('.navbar-collapse').collapse('hide');
	}

	onLogout = () => {
		this.domain.postLogout();
		$('.navbar-collapse').collapse('hide');
	}

	/*
	* Logged in event handlers
	*/

	onDashBoard = () => {
		this.ui.changeMenu("dash", 0);
		this.ui.changeDropDownMenu("brand");
		$('.navbar-collapse').collapse('hide');
	}

	onVisionBoard = () => {
		this.ui.updateDropDownMenu();
		this.ui.changeMenu("vision", 1);
		this.ui.changeDropDownMenu("vision", "My Vision");
		$('.navbar-collapse').collapse('hide');
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
		$('.navbar-collapse').collapse('hide');
	}

	onHabits= () => {
		this.ui.changeMenu("habits", 3);
		this.ui.changeDropDownMenu("habits", "My Habits");
		$('.navbar-collapse').collapse('hide');
	}

	onSettings = () => {
		this.ui.changeMenu("settings", 4);
		this.ui.changeDropDownMenu("brand");
		$('.navbar-collapse').collapse('hide');
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
}

export default observer(Header);