import React from 'react';
import { observable, decorate, computed} from 'mobx';
import Title from '../components/Title';
import Register from '../components/Register';
import Login from '../components/Login';
import Vision from '../components/Vision';
import GraphicItem from '../components/graphic/GraphicItem';
import GraphicGoal from '../components/graphic/GraphicGoal';
import GraphicVision from '../components/graphic/GraphicVision';

class UIStore {

	constructor(root){
		this.root = root;
		this.loginMenu = "title";
		this.graphicMenu = "vision";
		this.visionMenu = "closed";
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

	set vision(val){
		this.visionMenu = val;
	}

	get vision(){
		return this.visionMenu;
	}
}

decorate(UIStore, {
	loginMenu: observable,
	visionMenu: observable,
	menu: computed
})

export default UIStore;