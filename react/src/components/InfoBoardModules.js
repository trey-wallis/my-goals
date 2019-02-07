import React, { Component } from 'react';
import DeadlineModule from "../components/DeadlineModule";
import StatsModule from "../components/StatsModule";
import VisionItemModule from "../components/VisionItemModule"
import {Goals} from "../data/Goals.js";
import {StatsData} from "../data/StatsData.js";

class InfoModules extends Component {

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
		const filteredGoals = this.state.goals.filter(goals => {
			const current_date = new Date();
			const date = new Date(goals.due);

			if (current_date.getTime() > date.getTime()){
				return goals;
			}
			return "";
		});
		switch(id){
			case "deadlines":
				return (<DeadlineModule goals={filteredGoals} />);
			case "stats":
				return (<StatsModule stats={this.state.stats} />);
			case "visionitem":
				return (<VisionItemModule goals={this.state.goals} />);
			default:
				return "";
		}
	}

	render(){
		return(
		<div className="InfoModules">
			{this.renderModules()}
		</div>);
	}
}

export default InfoModules;