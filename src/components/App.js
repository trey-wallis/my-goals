import React, { Component } from 'react';
import {observer} from 'mobx-react';
import {HashRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import RootStore from '../store/RootStore';

import Register from '../components/Register';
import Login from '../components/Login';
import Title from '../components/Title';
import DashBoard from '../components/DashBoard';
import VisionBoard from '../components/VisionBoard';
import Goals from '../components/Goals';
import Calendar from '../components/Calendar';
import Settings from '../components/Settings';

import HeaderSideBar from '../components/header/HeaderSideBar';
import HeaderNav from '../components/header/HeaderNav';

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
				<div>
					<HeaderNav/>
					{this.domain.connection.connected ? <HeaderSideBar/> : ''}
						{RootStore.store.domain.connection.connected ?
							<div className="app-content">
								<Switch>
									<Route path='/dashboard' component={DashBoard}/>
									<Route path='/visionboard' component={VisionBoard}/>
									<Route path='/goals' component={Goals}/>
									<Route path='/calendar' component={Calendar}/>
									<Route path='/settings' component={Settings}/>
									<Redirect to='/dashboard' push={true}/>
								</Switch>
							</div> : 
							<Switch>
								<Route exact={true} path={'/'}  component={Title}/>
								<Route path='/login' component={Login}/>
								<Route path='/register' component={Register}/>
								<Redirect to='/' push={true} />
							</Switch>}
				</div>
			</Router>);
	}
}

export default observer(App);