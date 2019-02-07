import React from 'react';
import { observable, decorate, computed} from 'mobx';
import Title from '../components/Title';
import Register from '../components/Register';
import Login from '../components/Login';
import Vision from '../components/Vision';
import GraphicItem from '../components/GraphicItem';
import GraphicGoal from '../components/GraphicGoal';
import GraphicVision from '../components/GraphicVision';

class UIStore {

	constructor(root){
		this.root = root;
		this.loginMenu = "title";
		this.graphicMenu = "vision";
	}

	set menu(route){
		if (this.loginMenu === "login" || this.loginMenu === "register"){
			this.root.store.domain.response = "";
		}
		this.loginMenu = route;
	}

	get menu(){
		switch(this.loginMenu){
			case "login":
				return <Login/>
			case "register":
				return <Register/>
			case "vision":
				return <Vision/>
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
}

decorate(UIStore, {
	loginMenu: observable,
	menu: computed
})

export default UIStore;