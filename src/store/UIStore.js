import React from 'react';
import { observable, decorate, computed} from 'mobx';
import DropDownMenuGoals from '../components/nav/DropDownMenuGoals';
import DropDownMenuVision from '../components/nav/DropDownMenuVision';

class UIStore {

	constructor(root){
		this.root = root;

		this.navItemActive = 0;

		this.dropDownMenu = {
			active: -1,
			items: [],
			route: "none",
			title: "My Goals",
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

	changeDropDownMenu(route, title="My Goals", active=-1){
		this.dropDownMenu.route = route;
		this.dropDownMenu.title = title;
		this.dropDownMenu.active = active;
	}

	get dropDown(){
		switch(this.dropDownMenu.route){
			case "vision":
				return <DropDownMenuVision />;
			case "goals":
				return <DropDownMenuGoals />;
			default:
				return <div className="navbar-brand">My Goals</div>;
		}
	}

	set dropDownMenuTitle(title){
		this.dropDownMenuTitle = title;
	}

	/*
	* DropDownMenu Getters/Setters
	*/
	get dropDownMenuTitle() {
		if (this.dropDownMenu.active === -1){
			return this.dropDownMenu.title;
		}
		return this.dropDownMenu.items[this.dropDownMenu.active];
	}

	get dropDownMenuItems() {;
		return this.dropDownMenu.items;
	}

	set dropDownMenuActive(index){
		this.dropDownMenu.active = index;
	}

	get dropDownMenuActive(){
		return this.dropDownMenu.active;
	}

	updateDropDownMenu(){
		const categories = this.root.store.domain.visionCategories.map(category => {
			return category.name;
		});
		this.dropDownMenu.items = categories;
	}

	/*
	* General Functions
	*/
	isDropDownMenuItemActive(index){
		if (index === this.dropDownMenu.active)
			return "active";
		return "";
	}

}

decorate(UIStore, {
	dropDownMenu: observable,
	navItemActive: observable,
})

export default UIStore;