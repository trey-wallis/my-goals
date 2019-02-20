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

class UIStore {

	constructor(root){
		this.root = root;

		this.dropDownMenu = {
			items: [],
			active: -1,
		}

		this.navMenu = {
			displayDropDownMenu: true,
			route: "title",
			active: 0
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

	/*
	* DropDownMenu Getters/Setters
	*/
	get dropDownMenuTitle() {
		if (this.dropDownMenu.active === -1){
			return "My Goals";
		}
		return this.dropDownMenu.items[this.dropDownMenu.active];
	}

	get dropDownMenuItems() {
		return this.dropDownMenu.items;
	}

	set dropDownMenuItems(items){
		this.dropDownMenu.items = items;
	}

	set dropDownMenuActive(index){
		this.dropDownMenu.active = index;
	}

	get dropDownMenuActive(){
		return this.dropDownMenu.active;
	}

	/*
	* NavMenu Getters and Setters
	*/
	changeMenu(route, active, displayDropDownMenu=true){
		this.navMenu.route = route;
		this.navMenu.active = active;
		this.navMenu.displayDropDownMenu = displayDropDownMenu;
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
	menu: computed
})

export default UIStore;