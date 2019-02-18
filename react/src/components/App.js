import React, { Component } from 'react';
import {observer} from 'mobx-react';

import RootStore from '../store/RootStore';
import Header from '../components/Header';
import AddVisionCategory from '../components/vision/AddVisionCategory';
import AddVisionItem from '../components/vision/AddVisionItem';
import EditVision from '../components/vision/EditVision.js';

class App extends Component {

	render(){
		const {ui, domain} = RootStore.store;

		return (
			<div className="App">
				<Header />
				{ui.menu}
				{domain.loggedIn ? <AddVisionCategory /> : ''}
				{domain.loggedIn ? <AddVisionItem /> : ''}
				{domain.loggedIn ? <EditVision /> : ''}
			</div>);
	}
}

export default observer(App);