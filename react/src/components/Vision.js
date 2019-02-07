import React, {Component} from 'react';
import {observer} from 'mobx-react';
import '../css/Vision.css';
import RootStore from '../store/RootStore';
import Controller from '../components/Controller';
import GraphicVisionAddMenu from '../components/graphic/GraphicVisionAddMenu';
import GraphicVisionEditMenu from '../components/graphic/GraphicVisionEditMenu';

class Vision extends Component {

	constructor(){
		super();
		let {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
	}

	renderVisionMenu(){
		switch(this.ui.visionMenu){
			case "add":
				return <GraphicVisionAddMenu/>
			case "edit":
				return <GraphicVisionEditMenu/>
			default:
				return "";
		}
	}

	render(){
		return (
			<div className="Vision">
				{this.ui.graphic}
				<Controller />
				{this.renderVisionMenu()}
			</div>);
	}
}

export default observer(Vision);