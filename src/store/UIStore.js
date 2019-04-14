import React from 'react';
import { observable, decorate} from 'mobx';
import DropDownGoals from '../components/dropdown/DropDownGoals';
import DropDownVision from '../components/dropdown/DropDownVision';
import DropDownHabits from '../components/dropdown/DropDownHabits';

class UIStore {

	constructor(root){
		this.root = root;

		this.states = {
			FILTER_GOAL_NONE: -1,
			FILTER_GOAL_WEEK: 0,
			FILTER_GOAL_MONTH: 1,
			FILTER_GOAL_COMPLETED: 2
		};

		this.ONE_WEEK_MILLIS = 1000 * 60 * 60 * 24 * 7;
		this.ONE_MONTH_MILLIS = 100 * 60 * 60 * 24 * 30; 

		this.navItemActive = 0;
		this.dropDown = {
			id: 0,
			active: -1,
			items: []
		}

		this.filterGoal = {
			id: this.states.FILTER_GOAL_COMPLETED
		}

		this.deleteVisionItemId = -1;
		this.habitDate = new Date();
	}

	isFilterGoalActive(i){
		if (this.filterGoals.id === i)
			return 'active';
		return '';
	}

	isNavItemActive(index){
		if (this.navItemActive === index)
			return " active";
		return "";
	}

	set itemActive(index){
		this.navItemActive = index;
	}

	isDropDownItemActive(index){
		if (index === this.dropDown.active)
			return " active";
		return '';
	}

	get renderDropDown(){
		switch(this.dropDown.id){
			case 1:
				return <DropDownVision/>;
			case 2:
				return <DropDownGoals/>;
			case 3:
				return <DropDownHabits/>;
			default:
				return <div className="navbar-brand">My Goals</div>;
		}
	}
}

decorate(UIStore, {
	dropDown: observable,
	navItemActive: observable,
	editGoalId: observable,
	filterGoal: observable,
	habitDate: observable
})

export default UIStore;