import React, {Component} from 'react';
import {observer} from 'mobx-react';
import '../css/Header.css';
import menu from '../img/icons/menu-icon.png';
import RootStore from '../store/RootStore';

class Header extends Component {
	
	constructor(){
		super();
		let {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
	}

	onRegister = () => {
		this.ui.menu = {
			active: "register",
			activeIndex: 2
		}
	}

	onLogout = () => {
		this.domain.logout();
	}

	onLogin = () => {
		this.ui.menu = {
			active: "login",
			activeIndex: 1
		}
	}

	onHome = () => {
		this.ui.menu = {
			active: "title",
			activeIndex: 0
		}
	}

	onDashBoard = () => {
		this.ui.menu = {
			active: "dash",
			activeIndex: 0
		}
	}

	onVisionBoard = () => {
		this.ui.menu = {
			active: "vision",
			activeIndex: 1
		}
	}

	onGoals = () => {
		this.ui.menu = {
			active: "goals",
			activeIndex: 2
		}
	}

	onHabits= () => {
		this.ui.menu = {
			active: "habits",
			activeIndex: 3
		}
	}

	onSettings = () => {
		this.ui.menu = {
			active: "settings",
			activeIndex: 4
		}
	}

	renderDropDownMenu(){
		let menu = [];
		for (let i = 0; i < this.ui.dropDownItems.length; i++){
			menu.push(<button className={this.ui.getDropDownNavActive(i) + " btn btn--reset dropdown-item"}>{this.ui.dropDownItems[i]}</button>);
		}
		return menu;
	}

	renderLoggedIn(){

		return(
			<nav className="navbar navbar-expand-md navbar-dark bg-primary">
			    <div className="btn-group">
					<button type="button" className="btn btn--reset dropdown-toggle" data-toggle="dropdown" id="navbar-dropdown">{this.ui.dropDownTitle}</button>
					<div className="dropdown-menu">
						{
							this.renderDropDownMenu()
						}
				    	<div className="dropdown-divider"></div>
				    	<button type="button" className="btn btn-primary ml-2">Edit</button>
					</div>
				</div>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-main">
    				<span className="navbar-toggler-icon"></span>
  				</button>
  				<div className="collapse navbar-collapse" id="navbar-main">
    				<ul className="navbar-nav ml-auto">
    				    <li className={this.ui.getMainNavActive(0) + " nav-item ml-auto"}>
	        				<button className="nav-link btn--reset" onClick={this.onDashBoard}>Dashboard</button>
	      				</li>
	      				<li className={this.ui.getMainNavActive(1) + " nav-item ml-auto"}>
	        				<button className="nav-link btn--reset" onClick={this.onVisionBoard}>Vision Board</button>
	      				</li>
	      				<li className={this.ui.getMainNavActive(2) + " nav-item ml-auto"}>
	        				<button className="nav-link btn--reset" onClick={this.onGoals}>Goals</button>
	      				</li>
	      				<li className={this.ui.getMainNavActive(3) + " nav-item ml-auto"}>
	        				<button className="nav-link btn--reset" onClick={this.onHabits}>Habits</button>
	      				</li>
	      				<li className={this.ui.getMainNavActive(4) + " nav-item ml-auto"}>
	        				<button className="nav-link btn--reset" onClick={this.onSettings}>Settings</button>
	      				</li>
	      				<li className={this.ui.getMainNavActive(5) + " nav-item ml-auto"}>
	        				<button className="nav-link btn--reset" onClick={this.onLogout}>Logout</button>
	      				</li>
    				</ul>
    			</div>
    		</nav>);
	}

	renderLoggedOut(){
		return(
			<nav className="navbar navbar-expand-md navbar-dark bg-primary">
			    <button className="navbar-brand btn--reset" onClick={this.onHome}>My Goals</button>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-main">
    				<span className="navbar-toggler-icon"></span>
  				</button>
  				<div className="collapse navbar-collapse" id="navbar-main">
    				<ul className="navbar-nav ml-auto">
      					<li className={this.ui.getMainNavActive(1) + " nav-item ml-auto"}>
        					<button className="nav-link btn--reset" onClick={this.onLogin}>Login</button>
      					</li>
      					<li className={this.ui.getMainNavActive(2) + " nav-item ml-auto"}>
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