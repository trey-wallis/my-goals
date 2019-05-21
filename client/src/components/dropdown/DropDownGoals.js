import React, {Component} from 'react';

import $ from 'jquery';
import RootStore from '../../store/RootStore';

import DropDown from './DropDown';

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

	filterChange = (id) => {
		this.ui.filterGoal.id = id;
	}

	render(){
		return(
			<DropDown title="Options">
				{this.domain.visionData.items.length > 0 ?
				    <button className="dropdown-item" onClick={this.onAddGoal}>Add Goal</button>: ''}
				<div className="dropdown-divider"></div>
				{this.domain.goalData.length > 0 ?
					<div>
						<button className="dropdown-item" onClick={()=>{this.filterChange(this.ui.states.FILTER_GOAL_NONE)}}>Show All</button>
						<button className="dropdown-item" onClick={()=>{this.filterChange(this.ui.states.FILTER_GOAL_COMPLETED)}}>In Progress</button>
						<button className="dropdown-item" onClick={()=>{this.filterChange(this.ui.states.FILTER_GOAL_WEEK)}}>This Week</button>
						<button className="dropdown-item" onClick={()=>{this.filterChange(this.ui.states.FILTER_GOAL_MONTH)}}>This Month</button>
						</div>
					: ''}
			</DropDown>
		);
	}
}

export default DropDownGoals;