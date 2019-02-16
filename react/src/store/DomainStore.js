import { observable, decorate } from "mobx";
import {Categories} from '../data/Categories.js';

class DomainStore {

	constructor(root){
		this.root = root;
		this.connected = false;
		this.displayName = "Trey";
		this.username = "";
		this.password = "";
		this.passwordRepeat = "";
		this.serverResponse = "";
		this.dataForCategories = Categories;
	}

	get loggedIn(){
		return this.connected;
	}

	get name(){
		return this.displayName;
	}

	set loginUser(name){
		this.username = name;
	}

	set loginPass(pass){
		this.password = pass;
	}

	get loginUser(){
		return this.username;
	}

	get loginPassword(){
		return this.password;
	}

	get loginResponse(){
		return this.serverResponse;
	}

	set registerUser(name){
		this.username = name;
	}

	set registerPass(pass){
		this.password = pass;
	}

	set registerPassRepeat(pass){
		this.passwordRepeat = pass;
	}

	set response(res){
		this.serverResponse = res;
	}

	get registerResponse(){
		return this.serverResponse;
	}

	get categoriesData(){
		return this.dataForCategories;
	}

	login = () => {
		 fetch('http://localhost:3006/signin', {
		 	method: 'post',
		 	headers: {'Content-Type': 'application/json'},
		 	body: JSON.stringify({
		 		username: this.username,
		 		password: this.password
		 	})
		 })
		 .then(response => response.json())
		 .then(response => this.serverResponse = response)
		 .catch(error => this.serverResponse = "Client error: " + error.message);
		//this.connected = true;
		//this.root.store.ui.menu = "vision";
		//console.log("Connected!");
	}

	register = () => {
		fetch('http://localhost:3006/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				username: this.username,
				password: this.password
			})
		})
		.then(response => response.json())
		.then(response => this.serverResponse = response)
		.catch(error => this.serverResponse = "Client error: " + error.message);
	}

	logout = () => {
		this.connected = false;
		this.root.store.ui.menu = "title";
	}

	postVisionCategory = () => {
		console.log("Posting category!");
		this.dataForCategories.push(
		{
			name: this.root.store.ui.vCategoryName,
			items: []
		});
		this.root.store.ui.vCategoryName = "";
	}

	postVisionItem = () => {
		console.log("Posting item!");

	}
}

decorate(DomainStore, {
	serverResponse: observable,
	connected: observable,
	dataForCategories: observable
})

export default DomainStore;