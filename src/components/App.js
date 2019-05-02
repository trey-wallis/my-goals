import React, { Component } from 'react';
import {observer} from 'mobx-react';
import {HashRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import RootStore from '../store/RootStore';

import HeaderSideBar from '../components/header/HeaderSideBar';
import HeaderNav from '../components/header/HeaderNav';
import Register from '../components/Register';
import Login from '../components/Login';
import Title from '../components/Title';
import DashBoard from '../components/DashBoard';
import VisionBoard from '../components/VisionBoard';
import Goals from '../components/Goals';
import Habits from '../components/Habits';
import Settings from '../components/Settings';

import './App.css';

class App extends Component {

	constructor(){
		super();
		const {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
	}

	componentDidMount(){
		this.domain.checkLogin();
	}

	render(){
		return (
			<Router>
				<div className="app">
					<HeaderNav/>
					<HeaderSideBar/>
					<div className="app-content">
						{this.domain.connection.connected ?
							<Switch>
								<Route path="/dashboard" component={DashBoard}/>
								<Route path="/visionboard" component={VisionBoard}/>
								<Route path="/goals" component={Goals}/>
								<Route path="/habits" component={Habits}/>
								<Route path="/settings" component={Settings}/>
								<Redirect to="/dashboard" push={true} />
							</Switch> : 
							<Switch>
								<Route exact={true} path={'/'}  component={Title}/>
								<Route path={`/login`} component={Login}/>
								<Route path={`/register`} component={Register}/>
								<Redirect to={'/'} push={true} />
						</Switch>}
					</div>
				</div>
			</Router>);
	}
}

export default observer(App);