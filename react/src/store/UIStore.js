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
			activeIndex: 0,
		}

		this.navMenu = {
			brand: true,
			active: "title",
			activeIndex: 0
		}
	}

	/*
	* Show Brand Getters/Setters
	*/
	get showBrand(){
		return this.navMenu.brand;
	}

	set showBrand(val){
		this.navMenu.brand = val;
	}

	/*
	* DropDownMenu Getters/Setters
	*/
	get dropDownTitle() {
		return this.dropDownMenu.items[this.dropDownMenu.activeIndex];
	}

	get dropDownItems() {
		return this.dropDownMenu.items;
	}

	set dropDownActive(index){
		this.dropDownMenu.activeIndex = index;
	}

	get dropDownActive(){
		return this.dropDownMenu.activeIndex;
	}

	/*
	* NavMenu Getters and Setters
	*/
	set menu(route){
		this.navMenu = route;
	}

	get menu(){
		switch(this.navMenu.active){
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
	getDropDownNavActive(index){
		if (index === this.dropDownMenu.activeIndex)
			return "active";
		return "";
	}

	getMainNavActive(index){
		if (index === this.navMenu.activeIndex)
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