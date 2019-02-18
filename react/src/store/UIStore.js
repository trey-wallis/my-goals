import React from 'react';
import { observable, decorate, computed} from 'mobx';
import Title from '../components/Title';
import Register from '../components/Register';
import Login from '../components/Login';
import DashBoard from '../components/DashBoard';
import VisionBoard from '../components/VisionBoard';
import Goals from '../components/Goals';
import Habits from '../components/Habits';
import Vision from '../components/Vision';
import Settings from '../components/Settings';
import GraphicItem from '../components/graphic/GraphicItem';
import GraphicGoal from '../components/graphic/GraphicGoal';
import GraphicVision from '../components/graphic/GraphicVision';

class UIStore {

	constructor(root){
		this.root = root;

		this.dropDownMenu = {
			items: ["Category 1", "Category 2", "Category 3"],
			activeIndex: 0,
		}

		this.navMenu = {
			active: "title",
			activeIndex: 0
		}

		this.editMenu = {
			categoryInputName: ""
		}
	}

	set categoryInputName(text) {
		this.editMenu.categoryInputName = text;
	}

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

	get dropDownTitle() {
		return this.dropDownMenu.items[this.dropDownMenu.activeIndex];
	}

	get dropDownItems() {
		return this.dropDownMenu.items;
	}

	clickDropDown(index){
		this.dropDownMenu.activeIndex = index;
	}

	set menu(route){
		if (this.navMenu.active === "login" || this.navMenu.active === "register"){
			this.root.store.domain.response = "";
			this.root.store.domain.username = "";
			this.root.store.domain.password = "";
			this.root.store.domain.passwordRepeat = "";
		}
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
}

decorate(UIStore, {
	navMenu: observable,
	dropDownMenu: observable,
	visionMenu: observable,
	visionCategoryName: observable,
	menu: computed
})

export default UIStore;