import React from 'react';
import { observable, decorate, computed } from 'mobx';
import DropDownGoals from '../components/dropdown/DropDownGoals';
import DropDownVision from '../components/dropdown/DropDownVision';

import Register from '../components/Register';
import Login from '../components/Login';
import Title from '../components/Title';
import DashBoard from '../components/DashBoard';
import VisionBoard from '../components/VisionBoard';
import Goals from '../components/Goals';

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

		this.currentMenu = "home";

		this.openIdeaPanel = false;

		this.filterGoal = {
			id: this.states.FILTER_GOAL_COMPLETED
		}

		this.deleteVisionItemId = -1;
		this.deleteVisionCategoryId = -1;
		this.habitDate = new Date();
	}

	isFilterGoalActive(i){
		if (this.filterGoals.id === i)
			return 'active';
		return '';
	}

	isMenuActive(name){
		if (this.currentMenu === name)
			return true;
		return false;
	}

	get renderDropDown(){
		switch(this.currentMenu){
			case "vision":
				return <DropDownVision/>;
			case "goals":
				return <DropDownGoals/>;
			default:
				return '';
		}
	}

	get renderMenu(){
		switch (this.currentMenu){
			case "login":
				return <Login/>
			case "register":
				return <Register/>
			case "dashboard":
				return <DashBoard/>
			case "vision":
				return <VisionBoard/>
			case "goals":
				return <Goals/>
			default:
				return <Title/>
		}
	}
}

decorate(UIStore, {
	currentMenu: observable,
	renderMenu: computed,
	renderDropDown: computed,
	navItemActive: observable,
	editGoalId: observable,
	filterGoal: observable,
	habitDate: observable,
	deleteVisionItemId: observable,
	deleteVisionCategoryId: observable,
	openIdeaPanel: observable
})

export default UIStore;
