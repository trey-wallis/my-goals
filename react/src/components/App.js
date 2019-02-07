import React, { Component } from 'react';
import {observer} from 'mobx-react';

import '../css/App.css';

import RootStore from '../store/RootStore';
import Header from '../components/Header';

class App extends Component {

	render(){
		const {ui, domain} = RootStore.store;

		return (
			<div className="App">
				<Header />
				{ui.menu}
			</div>);
	}
}

export default observer(App);