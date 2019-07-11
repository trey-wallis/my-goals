import React, { Component } from 'react';
import {observer} from 'mobx-react';

import RootStore from '../store/RootStore';

import IdeaPanel from '../components/IdeaPanel';

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
			<div className="App">
				<HeaderNav/>
				{this.domain.connection.connected ? <HeaderSideBar/> : ''}
				{this.domain.connection.connected ? <div className="App-content">{RootStore.store.ui.renderMenu}</div> : RootStore.store.ui.renderMenu}
				{this.domain.connection.connected ? <IdeaPanel/> : ''}
			</div>
		);
	}
}

export default observer(App);
