import { observable, decorate } from "mobx";

class DomainStore {

	constructor(root){
		this.root = root;
		this.connected = false;
		this.displayName = "Trey";
		this.username = "";
		this.password = "";
		this.passwordRepeat = "";
		this.serverResponse = "";
		this.visionData = [];
	}

	get loggedIn(){
		return this.connected;
	}

	get name(){
		return this.displayName;
	}

	set user(user){
		this.username = user;
	}

	set pass(pass){
		this.password = pass;
	}

	set passRepeat(passRepeat){
		this.passwordRepeat = passRepeat;
	}

	get user(){
		return this.username;
	}

	get pass(){
		return this.password;
	}

	get passRepeat(){
		return this.passwordRepeat;
	}

	set response(res){
		this.serverResponse = res;
	}

	get response(){
		return this.serverResponse;
	}

	get visionItems(){
		return this.visionData;
	}

	login(){
		this.connected = true;
		this.root.store.ui.menu = {
			active: "dash",
			activeIndex: 0
		}
	}

	connectLogin = () => {
		let successful = false;
		 fetch('http://localhost:3006/signin', {
		 	method: 'post',
		 	headers: {'Content-Type': 'application/json'},
		 	body: JSON.stringify({
		 		username: this.username,
		 		password: this.password
		 	})
		 })
		 .then(response => {
		 	if (response.status === 200){
		 		successful = true;
		 	}
		 	return response.json();
		 })
		 .then(response => {
		 	if (!successful){
		 		this.serverResponse = response;
		 	} else {
		 		this.visionData = response;
		 		console.log(response);
		 		this.login();
		 	}
		 })
		 .catch(error => this.serverResponse = "Client error: " + error.message);
	}

	connectRegister = () => {
		 fetch('http://localhost:3006/register', {
		 	method: 'post',
		 	headers: {'Content-Type': 'application/json'},
		 	body: JSON.stringify({
		 		username: this.username,
		 		password: this.password,
		 		passwordRepeat: this.passwordRepeat
		 	})
		 })
		 .then(response => {
		 	if (response.status === 200){
		 		this.login();
		 		console.log("logging in");
		 	} else {
		 	return response.json();
		 	}
		 })
		 .then(response => {
		 	this.serverResponse = response;
		 })
		 .catch(error => this.serverResponse = "Client error: " + error.message);
	}

	saveEditChanges = () => {
		fetch('http://localhost:3006/edit', {
		 	method: 'post',
		 	headers: {'Content-Type': 'application/json'},
		 	body: JSON.stringify({
		 		username: this.username,
		 	})
		 })
		 .then(response => {
		 	if (response.status === 200){
		 		this.login();
		 		console.log("logging in");
		 	} else {
		 	return response.json();
		 	}
		 })
		 .then(response => {
		 	this.serverResponse = response;
		 })
		 .catch(error => this.serverResponse = "Client error: " + error.message);
	}

	logout = () => {
		this.connected = false;
		this.root.store.ui.menu = {
			active: "title",
			activeIndex: 0
		}
	}
}

decorate(DomainStore, {
	serverResponse: observable,
	connected: observable,
	dataForCategories: observable
})

export default DomainStore;