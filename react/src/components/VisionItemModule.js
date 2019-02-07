import React, { Component } from 'react';
import VisionItemGoal from '../components/VisionItemGoal.js';
import '../css/VisionItemModule.css';

class VisionItemModule extends Component {

	populateGoals(goals){

		return goals.map((goal, i) => {
			return (
				<VisionItemGoal
					 key={i}
					 name={goals[i].name}
					 progress={goals[i].progress}
					 due={goals[i].due}
					 onClick={this.onClick}
				/>);
		});
	}

	onClick(event){
		alert("clicked!");
	}

	render(){
		return(
			<div className="VisionItemModule">
				<header className="VisionItemModule__header">Goals</header>
				{ this.populateGoals(this.props.goals) }
			</div>);
	}
}

export default VisionItemModule;