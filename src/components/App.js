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
import Logout from '../components/Logout';

class App extends Component {

	constructor(){
		super();
		const {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
	}

	componentDidMount(){
		//this.domain.checkLogin();
	}

	render(){
		return (
			<Router>
				<div className="App">
					{this.domain.loggedIn ? 
						HeaderLoggedIn(this.ui, this.domain): HeaderLoggedOut()}
					{this.domain.loggedIn ?
						<Switch>
							<Route path="/dashboard" component={DashBoard}/>
							<Route path="/visionboard" component={VisionBoard}/>
							<Route path="/goals" component={Goals}/>
							<Route path="/habits" component={Habits}/>
							<Route path="/settings" component={Settings}/>
							<Route path="/logout" component={Logout}/>
							{this.domain.connected ?
							<Redirect to="/dashboard" push={true} /> : ''}
						</Switch> : 
						<React.Fragment>
							<Route exact={true} path="/" component={Title}/>
							<Route path="/login" component={Login}/>
							<Route path="/register" component={Register}/>
						</React.Fragment>}
				</div>
			</Router>);
	}
}

const HeaderLoggedIn = (ui, domain) => {
		return (<nav className="navbar navbar-expand-md navbar-dark bg-primary" id="navbar-top">
		{ui.dropDown}
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-main">
    		<span className="navbar-toggler-icon"></span>
  		</button>
  		<div className="collapse navbar-collapse" id="navbar-main">
    		<ul className="navbar-nav ml-auto">
	      		<li className="nav-item ml-auto">
        			<Link to={'/dashboard'} className="nav-link">Dashboard</Link>
	      		</li>
	      		<li className="nav-item ml-auto">
        			<Link to={'/visionboard'} className="nav-link">Vision Board</Link>
	      		</li>
	      		<li className="nav-item ml-auto">
        			<Link to={'/goals'} className="nav-link">Goals</Link>
	      		</li>
	      		<li className="nav-item ml-auto">
        			<Link to={'/habits'} className="nav-link">Habits</Link>
	      		</li>
	      		<li className="nav-item ml-auto">
        			<Link to={'/settings'} className="nav-link">Settings</Link>
	      		</li>
	      		<li className="nav-item ml-auto">
        			<Link to={'/logout'} className="nav-link">Logout</Link>
	      		</li>
    		</ul>
   		</div>
  	</nav>);
};

const HeaderLoggedOut = () => (
	<nav className="navbar navbar-expand-md navbar-dark bg-primary" id="navbar-top">
		<Link to={'/'} className="navbar-brand">My Goals</Link>
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-main">
    		<span className="navbar-toggler-icon"></span>
  		</button>
  		<div className="collapse navbar-collapse" id="navbar-main">
    		<ul className="navbar-nav ml-auto">
      			<li className="nav-item ml-auto">
      				<Link to={'/login'} className="nav-link">Login</Link>
      			</li>
      			<li className="nav-item ml-auto">
        			<Link to={'/register'} className="nav-link">Register</Link>
      			</li>
    		</ul>
    	</div>
    </nav>
);

export default observer(App);