import React, { Component } from 'react';
import {observer} from 'mobx-react';

import RootStore from '../store/RootStore';
import Header from '../components/Header';
import AddVisionCategory from '../components/vision/AddVisionCategory';
import AddVisionItem from '../components/vision/AddVisionItem';
import AddGoal from '../components/goal/AddGoal';
import EditVision from '../components/vision/EditVision.js';
import AddVisionNote from '../components/vision/AddVisionNote';

class App extends Component {

	componentDidMount(){
		const {domain} = RootStore.store;
		domain.checkLogin();
	}

	render(){
		const {ui, domain} = RootStore.store;

		return (
			<div className="App">
				<Header />
				{ui.menu}
				{domain.loggedIn ? <AddVisionCategory /> : ''}
				{domain.loggedIn ? <AddVisionItem /> : ''}
				{domain.loggedIn ? <EditVision /> : ''}
				{domain.loggedIn ? <AddGoal /> : ''}
				{domain.loggedIn ? <AddVisionNote /> : ''}
			</div>);
	}
}

export default observer(App);