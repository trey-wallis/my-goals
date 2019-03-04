import React from 'react';
import { observable, decorate, computed} from 'mobx';
import DropDownGoals from '../components/dropdown/DropDownGoals';
import DropDownVision from '../components/dropdown/DropDownVision';

class UIStore {

	constructor(root){
		this.root = root;

		this.navItemActive = 0;

		this.dropDown = {
			id: 0,
			active: 0,
			items: []
		}
	}

	isNavItemActive(index){
		if (this.navItemActive === index)
			return " " + "active";
		return "";
	}

	set itemActive(index){
		this.navItemActive = index;
	}

	isDropDownItemActive(index){
		if (index === this.dropDown.active)
			return " " + "active";
		return '';
	}

	get renderDropDown(){
		switch(this.dropDown.id){
			case 1:
				return <DropDownVision/>;
			case 2:
				return <DropDownGoals/>;
			default:
				return <div className="navbar-brand">My Goals</div>;
		}
	}
}

decorate(UIStore, {
	dropDown: observable,
	navItemActive: observable,
})

export default UIStore;