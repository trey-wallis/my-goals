import React, { Component } from 'react';
import {observer} from 'mobx-react';

import RootStore from '../store/RootStore';
import Header from '../components/Header';
import Modals from '../components/Modals';

class App extends Component {

	render(){
		const {ui, domain} = RootStore.store;

		return (
			<div className="App">
				<Header />
				{ui.menu}
				<Modals />
			</div>);
	}
}

export default observer(App);