import React, { Component } from 'react';
import {observer} from 'mobx-react';
import {BrowserRouter as Router, Link, Route, Redirect, Switch} from 'react-router-dom';

import RootStore from '../store/RootStore';

import Register from '../components/Register';
import Login from '../components/Login';
import Title from '../components/Title';
import DashBoard from '../components/DashBoard';
import VisionBoard from '../components/VisionBoard';
import Goals from '../components/Goals';
import Habits from '../components/Habits';
import Settings from '../components/Settings';

class App extends Component {

	constructor(){
		super();
		const {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
		this.folder = "/my-goals"
	}

	componentDidMount(){
		this.domain.checkLogin();
	}

	render(){
		return (
			<Router>
				<div className="App">
					{this.domain.loggedIn ? 
						HeaderLoggedIn(this.folder, this.ui, this.domain): HeaderLoggedOut(this.folder, this.ui)}
					{this.domain.loggedIn ?
						<Switch>
							<Route path={this.folder + "/dashboard"} component={DashBoard}/>
							<Route path={this.folder + "/visionboard"} component={VisionBoard}/>
							<Route path={this.folder + "/goals"} component={Goals}/>
							<Route path={this.folder + "/habits"} component={Habits}/>
							<Route path={this.folder + "/settings"} component={Settings}/>
							{this.domain.connected ?
							<Redirect to={this.folder + "/dashboard"} push={true} /> : ''}
						</Switch> : 
						<div>
							<Route exact={true} path={this.folder + "/"} component={Title}/>
							<Route path={this.folder + "/login"} component={Login}/>
							<Route path={this.folder + "/register"} component={Register}/>
						</div>}
				</div>
			</Router>);
	}
}

const HeaderLoggedIn = (folder, ui, domain) => {
		return (<nav className="navbar navbar-expand-md navbar-dark bg-primary" id="navbar-top">
		{ui.renderDropDown}
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-main">
    		<span className="navbar-toggler-icon"></span>
  		</button>
  		<div className="collapse navbar-collapse" id="navbar-main">
    		<ul className="navbar-nav ml-auto">
	      		<li className="nav-item ml-auto">
        			<Link to={folder + '/dashboard'} className={"nav-link" + ui.isNavItemActive(0)}>Dashboard</Link>
	      		</li>
	      		<li className="nav-item ml-auto">
        			<Link to={folder + '/visionboard'} className={"nav-link" + ui.isNavItemActive(1)}>Vision Board</Link>
	      		</li>
	      		<li className="nav-item ml-auto">
        			<Link to={folder + '/goals'} className={"nav-link" + ui.isNavItemActive(2)}>Goals</Link>
	      		</li>
	      		<li className="nav-item ml-auto">
        			<Link to={folder + '/habits'} className={"nav-link" + ui.isNavItemActive(3)}>Habits</Link>
	      		</li>
	      		<li className="nav-item ml-auto">
        			<Link to={folder + '/settings'} className={"nav-link" + ui.isNavItemActive(4)}>Settings</Link>
	      		</li>
	      		<li className="nav-item ml-auto">
        			<button className="nav-link btn--reset" onClick={domain.postLogout}>Logout</button>
	      		</li>
    		</ul>
   		</div>
  	</nav>);
};

const HeaderLoggedOut = (folder, ui) => (
	<nav className="navbar navbar-expand-md navbar-dark bg-primary" id="navbar-top">
		<Link to={folder + '/'} className="navbar-brand">My Goals</Link>
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-main">
    		<span className="navbar-toggler-icon"></span>
  		</button>
  		<div className="collapse navbar-collapse" id="navbar-main">
    		<ul className="navbar-nav ml-auto">
      			<li className="nav-item ml-auto">
      				<Link to={folder + '/login'} className={"nav-link" + ui.isNavItemActive(1)}>Login</Link>
      			</li>
      			<li className="nav-item ml-auto">
        			<Link to={folder + '/register'} className={"nav-link" + ui.isNavItemActive(2)}>Register</Link>
      			</li>
    		</ul>
    	</div>
    </nav>
);

export default observer(App);