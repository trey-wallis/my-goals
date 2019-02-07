import React, {Component} from 'react';
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
		this.ui.menu = "register";
	}

	onLogout(){
		console.log("Logout!");
	}

	onLogin = () => {
		this.ui.menu = "login";
	}

	onHome = () => {
		this.ui.menu = "title";
	}

	renderLoggedIn(){
		const {ui, domain} = RootStore.store;
		return(
			<div className="Header__flex">
				<ul className="Header__ul">
					<li className="Header__li Header__title">My Goals</li>
					<li className="Header__li">
						<button className="Header__button" onClick={this.onHome}>Home</button>
					</li>
				</ul>
				<ul className="Header__ul Header__collapse">
					<li className="Header__li">Welcome {domain.name}</li>
					<li className="Header__li">
						<button className="Header__button" onClick={this.onLogout}>Logout</button>
					</li>
				</ul>
				<ul className="Header__ul Header__hidden">
					<li className="Header__li"></li>
					<li className="Header__li"></li>
				</ul>
			</div>);
	}

	renderLoggedOut(){
		return(
			<div className="Header__flex">
				<ul className="Header__ul">
					<li className="Header__li Header__title">My Goals</li>
					<li className="Header__li">
						<button className="Header__button" onClick={this.onHome}>Home</button>
					</li>
				</ul>
				<ul className="Header__ul Header__collapse">
					<li className="Header__li">
						<button className="Header__button" onClick={this.onRegister}>Register</button>
					</li>
					<li className="Header__li">
						<button className="Header__button" onClick={this.onLogin}>Login</button>
					</li>
				</ul>
				<ul className="Header__ul Header__hidden">
					<li className="Header__li">
						<img className="Header__icon" src={menu} alt="menu"/>
					</li>
				</ul>
			</div>);
	}

	render() {
		const {ui, domain} = RootStore.store;
		return (
			<header className="Header">
			{
				(domain.loggedIn ? this.renderLoggedIn() : this.renderLoggedOut())
			}
			</header>
		);
	}
}

export default Header;