import React from 'react';
import { observable, decorate, computed} from 'mobx';
import Title from '../components/Title';
import Register from '../components/Register';
import Login from '../components/Login';
import DashBoard from '../components/DashBoard';
import VisionBoard from '../components/VisionBoard';
import Goals from '../components/Goals';
import Habits from '../components/Habits';
import Settings from '../components/Settings';
import DropDownMenuGoals from '../components/nav/DropDownMenuGoals';
import DropDownMenuVision from '../components/nav/DropDownMenuVision';

class UIStore {

	constructor(root){
		this.root = root;

		this.dropDownMenu = {
			active: -1,
			items: [],
			route: "none",
			title: "My Goals",
		}

		this.navMenu = {
			route: "title",
			active: 0
		}
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

	/*
	* Show Brand Getters/Setters
	*/
	get displayDropDownMenu(){
		return this.navMenu.displayDropDownMenu;
	}

	set displayDropDownMenu(val){
		this.navMenu.displayDropDownMenu = val;
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
	* NavMenu Getters and Setters
	*/
	changeMenu(route, active){
		this.navMenu.route = route;
		this.navMenu.active = active;
	}

	get menu(){
		switch(this.navMenu.route){
			case "login":
				return <Login/>
			case "register":
				return <Register/>
			case "dash":
				return <DashBoard/>
			case "vision":
				return <VisionBoard/>
			case "goals":
				return <Goals/>
			case "habits":
				return <Habits/>
			case "settings":
				return <Settings/>
			default:
				return <Title/>
		}
	}

	/*
	* General Functions
	*/
	isDropDownMenuItemActive(index){
		if (index === this.dropDownMenu.active)
			return "active";
		return "";
	}

	isNavMenuItemActive(index){
		if (index === this.navMenu.active)
			return "active";
		return "";
	}
}

decorate(UIStore, {
	navMenu: observable,
	dropDownMenu: observable,
	visionMenu: observable,
	menu: computed,
})

export default UIStore;