import { observable, decorate, computed } from "mobx";
import $ from 'jquery';

class DomainStore {

	constructor(root){
		this.root = root;
		this.connected = false;

		this.visionData = {
			categories: [],
			items: []
		};

		this.profile = {
			id: -1,
			display: ""
		}

		this.addVisionCategoryForm = {
			name: "",
			response: ""
		}

		this.addVisionItemForm = {
			categoryId: 1,
			name: "",
			description: "",
			url: "",
			response: ""
		}

		this.loginForm = {
			username: "",
			password: "",
			response: ""
		}

		this.registrationForm = {
			username: "",
			password: "",
			passwordRepeat: "",
			response: ""
		}
	}

	/*
	* Add Vision Item Getters/Setters
	*/
	set addVisionItemName(name){
		this.addVisionItemForm.name = name;
	}

	set addVisionItemDescription(desc){
		this.addVisionItemForm.description = desc;
	}

	set addVisionItemUrl(url){
		this.addVisionItemForm.url = url;
	}

	set addVisionItemCategoryId(id){
		this.addVisionItemForm.categoryId = id;
	}

	get addVisionItemName(){
		return this.addVisionItemForm.name;
	}

	get addVisionItemDescription(){
		return this.addVisionItemForm.description;
	}

	get addVisionItemUrl(){
		return this.addVisionItemForm.url;
	}

	get addVisionItemResponse(){
		return this.addVisionItemForm.response;
	}

	/*
	* Add Category Getters/Setters
	*/
	set addVisionCategoryName(name){
		this.addVisionCategoryForm.name = name;
	}

	get addVisionCategoryName(){
		return this.addVisionCategoryForm.name;
	}

	get addVisionCategoryResponse(){
		return this.addVisionCategoryForm.response;
	}

	/*
	* Login Form Getters/Setters
	*/
	set loginUsername(user){
		this.loginForm.username = user;
	}

	set loginPassword(pass){
		this.loginForm.password = pass;
	}

	set loginResponse(response){
		this.loginForm.response = response;
	}

	get loginResponse(){
		return this.loginForm.response;
	}

	/*
	* Registration Form Getters/Setters
	*/
	set registrationUsername(user){
		this.registrationForm.username = user;
	}

	set registrationPassword(pass){
		this.registrationForm.password = pass;
	}

	set registrationPasswordRepeat(passRepeat){
		this.registrationForm.passwordRepeat = passRepeat;
	}

	set registrationResponse(response){
		this.registrationForm.response = response;
	}

	get registrationResponse(){
		return this.registrationForm.response;
	}

	/*
	* UI Methods
	*/
	login(){
		this.connected = true;
		this.root.store.ui.changeMenu("dash", 0, false);
	}

	logout = () => {
		this.connected = false;
		this.root.store.ui.changeMenu("title", 0, false);
	}

	get loggedIn(){
		return this.connected;
	}

	get visionCategories(){
		return this.visionData.categories;
	}

	get visionItems(){
		return this.visionData.items;
	}


	/*
	* Connection Methods
	*/
	connectLogin = () => {
		let successful = false;
		 fetch('http://localhost:3006/signin', {
		 	method: 'post',
		 	headers: {'Content-Type': 'application/json'},
		 	body: JSON.stringify({
		 		username: this.loginForm.username,
		 		password: this.loginForm.password
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
		 		this.loginForm.response = response;
		 	} else {
		 		this.profile = response;
		 		this.loginForm.username = "";
		 		this.loginForm.password = "";
		 		this.loginForm.response = "";
		 		this.getCategories();
		 	}
		 })
		 .catch(error => this.loginForm.response = "Unable to connect to api");
	}

	connectRegister = () => {
		let successful = false;
		 fetch('http://localhost:3006/register', {
		 	method: 'post',
		 	headers: {'Content-Type': 'application/json'},
		 	body: JSON.stringify({
		 		username: this.registrationForm.username,
		 		password: this.registrationForm.password,
		 		passwordRepeat: this.registrationForm.passwordRepeat
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
		 		this.registrationForm.response = response;
		 	} else {
		 		this.profile = response;
		 		this.registrationForm.username = "";
		 		this.registrationForm.password = "";
		 		this.registrationForm.passwordRepeat = "";
		 		this.getCategories();
		 	}
		 })
		 .catch(error => this.registrationForm.response = "Unable to connect to api");
	}

	/*
	* Get resource methods
	*/
	getCategories = () => {
		 fetch('http://localhost:3006/visionboard/' + this.profile.id)
		 .then(response => response.json())
		 .then(response => {
		 	this.visionData = response;

		 	//Instead of using selected
		 	if (this.visionData.categories.length > 0){
		 		this.addVisionItemForm.categoryId = this.visionData.categories[0].id;
		 	}
		 	this.login();
		 })
		 .catch(error => console.log);
	}

	/*
	* Post Methods
	*/
	postAddCategory = () => {
		let successful = false;
		fetch('http://localhost:3006/addcategory', {
		 	method: 'post',
		 	headers: {'Content-Type': 'application/json'},
		 	body: JSON.stringify({
		 		userId: this.profile.id,
		 		name: this.addVisionCategoryForm.name
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
		 		this.addVisionCategoryForm.response = response;
		 	} else { 
		 		this.visionData.categories.push(response);
		 		console.log(this.visionData);
		 		$("#add-vision-category-name").val('');
		 		$("#modal-add-category").modal('hide');
		 		this.addVisionCategoryForm.name = "";
		 		this.addVisionCategoryForm.response = "";
		 		this.root.uiStore.dropDownMenu.items.push(this.visionData.categories[this.visionData.categories.length - 1].name);
		 	}
		 })
		 .catch(error => console.log);
	}

	postAddVisionItem = () => {
		let successful = false;
		fetch('http://localhost:3006/addvisionitem', {
		 	method: 'post',
		 	headers: {'Content-Type': 'application/json'},
		 	body: JSON.stringify({
		 		name: this.addVisionItemForm.name,
		 		description: this.addVisionItemForm.description,
		 		url: this.addVisionItemForm.url,
		 		userId: this.profile.id,
		 		categoryId: this.addVisionItemForm.categoryId
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
		 		this.addVisionItemForm.response = response;
		 	} else { 
		 		this.visionData.items.push(response);
		 		$("#modal-add-vision-item").modal('hide'); 
		 		this.addVisionItemForm.name = "";
				this.addVisionItemForm.description = "";
				this.addVisionItemForm.url = "";
				this.addVisionItemForm.response = "";
		 	}
		 })
		 .catch(error => console.log);
	}

	fetch = async ()=> {
		console.log("test");
	}
}

decorate(DomainStore, {
	loginForm: observable,
	registrationForm: observable,
	addVisionCategoryForm: observable,
	addVisionItemForm: observable,
	connected: observable,
	visionData: observable,
	visionCategories: computed,
	visionItems: computed,
})

export default DomainStore;