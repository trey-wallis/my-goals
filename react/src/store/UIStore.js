import React from 'react';
import { observable, decorate, computed} from 'mobx';
import Title from '../components/Title';
import Register from '../components/Register';
import Login from '../components/Login';

class UIStore {

	constructor(root){
		this.root = root;
		this.currentMenu = "title";
	}

	set menu(route){
		this.currentMenu = route;
	}

	get menu(){
		switch(this.currentMenu){
			case "login":
				return <Login/>
			case "register":
				return <Register/>
			default:
				return <Title/>
		}
	}
}

decorate(UIStore, {
	currentMenu: observable,
	menu: computed
})

export default UIStore;