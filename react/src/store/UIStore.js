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
		this.graphicMenu = "vision";
		this.visionMenu = "closed";
		this.visionCategoryName = "";
		this.visionItemName = "";
		this.visionItemDescription = "";

		this.dropDownMenu = {
			title: "Category",
			items: ["Category 1", "Category 2", "Category 3"],
			activeIndex: 0,
		}

		this.navMenu = {
			active: "",
			activeIndex: 3
		}
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
		return this.dropDownMenu.title;
	}

	get dropDownItems() {
		return this.dropDownMenu.items;
	}

	set menu(route){
		if (this.navMenu.active === "login" || this.navMenu.active === "register"){
			this.root.store.domain.response = "";
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

	set graphic(route){
		this.graphicMenu = route;
	}

	get graphic(){
		switch(this.graphicMenu){
			case "item":
				return <GraphicItem/>
			case "goal":
				return <GraphicGoal/>
			default:
				return <GraphicVision/>
		}
	}

	set vision(val){
		this.visionMenu = val;
	}

	get vision(){
		return this.visionMenu;
	}

	set vItemDescription(desc){
		this.visionItemDescription = desc;
	}

	set vItemName(name){
		this.visionItemName = name;
	}

	set vCategoryName(cat){
		this.visionCategoryName = cat;
	}

	get vCategoryName(){
		return this.visionCategoryName;
	}

	resetVisionMenu(){
		this.visionCategoryName = "";
		this.visionItemName = "";
		this.visionItemDescription = "";
	}
}

decorate(UIStore, {
	navMenu: observable,
	visionMenu: observable,
	visionCategoryName: observable,
	menu: computed
})

export default UIStore;