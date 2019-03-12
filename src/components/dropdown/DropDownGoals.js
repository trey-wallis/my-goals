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
		for (let i = 0; i < this.domain.visionData.items.length; i++){
			const item = this.domain.visionData.items[i];
			if (item.categoryid === this.domain.addGoalForm.categoryId){
				this.domain.addGoalForm.note = item.notes;
				break;
			}
		}
		$('#modal-add-goal').modal('show');
	}

	render(){
		return(
			<div className="btn-group">
				<button type="button" className="btn btn--reset dropdown-toggle text-tertiary" data-toggle="dropdown" id="navbar-dropdown">My Goals</button>
				<div className="dropdown-menu">
					{this.domain.visionData.items.length > 0 ?
				    <button type="button" className="dropdown-item" onClick={this.onAddGoal}>Add Goal</button> : ''}
				</div>
			</div>);
	}
}

export default DropDownGoals;