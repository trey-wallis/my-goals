import React, {Component} from 'react';
import '../css/Header.css';
import menu from '../img/icons/menu-icon.png';

class Header extends Component {
	
	render() {
		return (
			<div className="Header">
				<header className="Header__header">
					<nav className="Header-nav__left">
						<ul className="Header-nav__ul">
							<li className="Header-nav__li Header-nav__title">My Goals</li>
							<li className="Header-nav__li">
								<button id="Header-nav__home" className="Header-nav__link-button">Home</button>
							</li>
						</ul>
					</nav>
					<nav className="Header-nav__right">
						<ul>
							<li id="Header-nav__greeting" className="Header-nav__li">Welcome {this.props.user}</li>
							<li className="Header-nav__li">
								<button id="Header-nav__logout" className="Header-nav__link-button">Logout</button>
							</li>
						</ul>
					</nav>
					<nav className="Header-nav__hidden">
						<ul className="Header-nav__ul">
							<li className="Header-nav__li Header-nav__menu-button">
								<img className="Header-nav__img" alt="menu" src={menu} />
							</li>
						</ul>
					</nav>
				</header>
			</div>);
	}
}

export default Header;