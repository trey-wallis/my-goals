import React, { Component } from 'react';
import DeadlineGoal from './DeadlineGoal.js';
import '../css/DeadlineModule.css';

class Deadlines extends Component {

	populateGoals(goals){
		return goals.map((goal, i) => {
			return (
				<DeadlineGoal
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
			<div className="DeadlineModule">
				<header className="DeadlineModule__header">Deadlines</header>
				{ this.populateGoals(this.props.goals) }
			</div>);
	}
}

export default Deadlines;