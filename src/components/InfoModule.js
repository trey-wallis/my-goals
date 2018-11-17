import React, { Component } from 'react';
import Deadlines from "../components/Deadlines";
import Stats from "../components/Stats";

class InfoModule extends Component {

	constructor(modules){
		super();
	}

	renderModules(){
		let modules = [];
		for (const id in this.props) {
			modules.push(this.renderModule(id));
		}
		return modules;
	}

	renderModule(id){
		switch(id){
			case "stats":
				return (<Stats />);
			case "deadlines":
				return (<Deadlines />);
			default:
				return "";
		}
	}

	render(){
		return(
		<div className="InfoModule">
			{this.renderModules()}
		</div>);
	}
}

export default InfoModule;