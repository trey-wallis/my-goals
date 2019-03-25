import React, {Component} from 'react';

import $ from 'jquery';
import RootStore from '../../store/RootStore';

class DropDownGoals extends Component {

	constructor(){
		super();
		let {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
	}

	onAddGoal = () => {
		$('#modal-add-goal').modal('show');
	}
	
	onFilterCompleted = () => {
		this.ui.filterCompletedGoals = !this.ui.filterCompletedGoals;
	}

	render(){
		return(
			<div className="btn-group">
				<button type="button" className="btn dropdown-toggle text-tertiary" data-toggle="dropdown" id="navbar-dropdown">My Goals</button>
				<div className="dropdown-menu">
					{this.domain.visionData.items.length > 0 ?
				    <button type="button" className="dropdown-item" onClick={this.onAddGoal}>Add Goal</button>: ''}
				    <button type="button" className="dropdown-item" onClick={this.onFilterCompleted}>Filter Completed</button>
				</div>
			</div>);
	}
}

export default DropDownGoals;