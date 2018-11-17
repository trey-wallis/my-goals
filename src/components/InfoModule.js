import React, { Component } from 'react';
import Deadlines from "../components/Deadlines";
import Stats from "../components/Stats";
import {Goals} from "../const/Goals.js";
import {StatsData} from "../const/StatsData.js";

class InfoModule extends Component {

	constructor(modules){
		super();
		this.state = {
			goals : Goals,
			stats : StatsData
		}
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
			case "deadlines":
				return (<Deadlines goals={this.state.goals} />);
			case "stats":
				return (<Stats stats={this.state.stats} />);
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