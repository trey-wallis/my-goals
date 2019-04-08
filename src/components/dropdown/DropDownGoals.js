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

	filterChange = (e) => {
		this.ui.filterGoal.id = parseInt(e.target.value);
	}

	render(){
		return(
			<div className="btn-group">
				<button type="button" className="btn dropdown-toggle text-tertiary" data-toggle="dropdown" id="navbar-dropdown">My Goals</button>
				<div className="dropdown-menu">
					{this.domain.visionData.items.length > 0 ?
				    <button type="button" className="dropdown-item" onClick={this.onAddGoal}>Add Goal</button>: ''}
					<div className="dropdown-divider"></div>

					<select className="form-control" value={this.ui.filterGoal.id} onChange={(e)=>{this.filterChange(e)}}>
						<option value={this.ui.states.FILTER_GOAL_NONE}>Show All</option>
						<option value={this.ui.states.FILTER_GOAL_COMPLETED}>Uncompleted</option>
						<option value={this.ui.states.FILTER_GOAL_WEEK}>This Week</option>
						<option value={this.ui.states.FILTER_GOAL_MONTH}>This Month</option>
					</select>

				</div>
			</div>);
	}
}

export default DropDownGoals;