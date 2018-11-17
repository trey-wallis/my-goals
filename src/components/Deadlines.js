import React, { Component } from 'react';
import Goal from './InfoGoal.js';
import '../css/Deadlines.css';

class Deadlines extends Component {

	populateGoals(goals){
		return goals.map((goal, i) => {
			return (
				<Goal
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
			<div className="Deadlines">
				<header className="Deadlines__header">Deadlines</header>
				{ this.populateGoals(this.props.goals) }
			</div>);
	}
}

export default Deadlines;