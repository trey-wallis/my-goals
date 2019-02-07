import React, { Component } from 'react';
import '../css/App.css';
import RootStore from '../store/RootStore';
import Header from '../components/Header';
import GraphicBoard from '../components/GraphicBoard';
import InfoBoard from '../components/InfoBoard';
import Title from '../components/Title';
import {observer} from 'mobx-react';

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