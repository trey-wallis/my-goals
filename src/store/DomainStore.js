import { observable, decorate, computed } from "mobx";
import $ from 'jquery';

class DomainStore {

	constructor(root){
		this.server = "https://my-goals-api.herokuapp.com";

		this.root = root;
		this.connected = false;

		this.goalData = {};

		this.visionData = {
			categories: [],
			items: []
		};

		this.profile = {
			uid: 0,
			display: "",
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

		this.settingsForm = {
			profile : {
				display: "",
				currentPassword: "",
				newPassword: "",
				newPasswordRepeat: "",
				response: ""
			}
		}

		this.addGoalForm = {
			categoryId: 0,
			visionItemId: 0,
			name: "",
			description: "",
			start: "",
			end: "",
			plans: "",
			response: "",
			note: "",
		}

		this.addVisionNoteForm = {
			text: "",
			response: "",
			visionItemId: 0
		}
	}

	/*
	* Add Goal Form
	*/

	get addGoalNote(){
		return this.addGoalForm.note;
	}

	set addGoalNote(note){
		this.addGoalForm.note = note;
	}
	
	get addGoalResponse(){
		return this.addGoalForm.response;
	}

	set addGoalName(name){
		this.addGoalForm.name = name;
	}

	set addGoalCategoryId(id){
		this.addGoalForm.categoryId = id;
	}

	set addGoalVisionItemId(id){
		this.addGoalForm.visionItemId = id;
	}

	get addGoalVisionItemId(){
		return this.addGoalForm.visionItemId;
	}

	get addGoalCategoryId(){
		return this.addGoalForm.categoryId;
	}

	set addGoalDescription(description){
		this.addGoalForm.description = description;
	}

	set addGoalPlans(plans){
		this.addGoalForm.plans = plans;
	}

	set addGoalStart(start){
		this.addGoalForm.start = start;
	}

	set addGoalEnd(end){
		this.addGoalForm.end = end;
	}

	get addGoalEnd(){
		return this.addGoalForm.end;
	}

	/*
	* Add Vision Note
	*/
	get addVisionNoteItemId(){
		return this.addVisionNoteForm.visionItemId;
	}

	set addVisionNoteItemId(id){
		this.addVisionNoteForm.visionItemId = id;
	}

	set addVisionNoteText(text){
		this.addVisionNoteForm.text = text;
	}

	get addVisionNoteText(){
		return this.addVisionNoteForm.text;
	}

	set addVisionNoteResponse(response){
		this.addVisionNoteForm.response = response;
	}


	get addVisionNoteResponse(){
		return this.addVisionNoteForm.response;
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

	get displayName(){
		return this.profile.display;
	}

	/*
	* Settings menu
	*/

	set settingsDisplay(display){
		this.settingsForm.profile.display = display;
	}

	get settingsDisplay(){
		return this.settingsForm.profile.display;
	}

	set settingsNewPassword(pass){
		this.settingsForm.profile.newPassword = pass;
	}

	get settingsNewPassword(){
		return this.settingsForm.profile.newPassword;
	}

	set settingsNewPasswordRepeat(repeat){
		this.settingsForm.profile.newPasswordRepeat = repeat;
	}

	get settingsNewPasswordRepeat(){
		return this.settingsForm.profile.newPasswordRepeat;
	}

	get settingsProfileResponse (){
		return this.settingsForm.profile.response;
	}

	get settingsCurrentPassword(){
		return this.settingsForm.profile.currentPassword;
	}

	set settingsCurrentPassword(pass){
		this.settingsForm.profile.currentPassword = pass;
	}

	/*
	* UI Methods
	*/
	login(){
		window.sessionStorage.setItem('uid', this.profile.uid);
		this.connected = true;
		this.root.store.ui.changeMenu("dash", 0, false);
	}

	logout = () => {
		window.sessionStorage.setItem('uid', 0);
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

	get goals(){
		return this.goalData;
	}

	checkLogin = () => {
		//Attempt to load id
		let successful = false;
		if (window.sessionStorage.getItem('uid') > 0) {
		 	fetch(`${this.server}/checkLogin`, {
		 		method: 'post',
		 		headers: {'Content-Type': 'application/json'},
		 		body: JSON.stringify({
		 			uid: window.sessionStorage.getItem('uid')
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
		 		console.log(response);
		 	} else {
		 		this.profile = response;
		 		this.getCategories();
		 	}
		 })
		 .catch(error => console.log);
		}
	}

	/*
	* Connection Methods
	*/
	connectLogin = () => {
		let successful = false;
		 fetch(`${this.server}/signin`, {
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
		 		this.getCategories();
		 	}
		 })
		 .catch(error => this.loginForm.response = "Unable to connect to api");
	}

	connectRegister = () => {
		let successful = false;
		 fetch(`${this.server}/register`, {
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
		 fetch(`${this.server}/visionboard/` + this.profile.uid)
		 .then(response => response.json())
		 .then(response => {
		 	this.visionData = response;

		 	//Instead of using selected
		 	if (this.visionData.categories.length > 0){
		 		this.addVisionItemForm.categoryId = this.visionData.categories[0].id;
		 	}
		 	this.getGoals();
		 })
		 .catch(error => console.log);
	}

	getGoals = () => {
		fetch(`${this.server}/goals`, {
		 	method: 'post',
		 	headers: {'Content-Type': 'application/json'},
		 	body: JSON.stringify({
		 		uid: this.profile.uid,
		 	})
		 })
		 .then(response => response.json())
		 .then(response => {
		 	this.goalData = response;
		 	this.login();
		 })
		 .catch(error => console.log);
	}

	getNote = () => {
		fetch(`${this.server}/note`, {
		 	method: 'post',
		 	headers: {'Content-Type': 'application/json'},
		 	body: JSON.stringify({
		 		uid: this.profile.uid,
		 		visionItemId: this.addVisionNoteForm.visionItemId
		 	})
		 })
		 .then(response => response.json())
		 .then(response => {
		 	this.addVisionNoteForm.text = response;
		 	$("#modal-add-vision-note").modal('show');
		 })
		 .catch(error => console.log);
	}

	/*
	* Post Methods
	*/
	postAddCategory = () => {
		let successful = false;
		fetch(`${this.server}/addvisioncategory`, {
		 	method: 'post',
		 	headers: {'Content-Type': 'application/json'},
		 	body: JSON.stringify({
		 		uid: this.profile.uid,
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
		 		$("#add-vision-category-name").val('');
		 		$("#modal-add-vision-category").modal('hide');
		 		this.addVisionCategoryForm.name = "";
		 		this.addVisionCategoryForm.response = "";
		 		this.root.store.ui.dropDownMenu.items.push(this.visionData.categories[this.visionData.categories.length - 1].name);
		 		this.root.store.ui.updateDropDownMenu();
		 	}
		 })
		 .catch(error => console.log);
	}

	postAddVisionItem = () => {
		let successful = false;
		fetch(`${this.server}/addvisionitem`, {
		 	method: 'post',
		 	headers: {'Content-Type': 'application/json'},
		 	body: JSON.stringify({
		 		name: this.addVisionItemForm.name,
		 		description: this.addVisionItemForm.description,
		 		url: this.addVisionItemForm.url,
		 		uid: this.profile.uid,
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

	postLogout = () => {
		fetch(`${this.server}/logout`, {
		 	method: 'post',
		 	headers: {'Content-Type': 'application/json'},
		 	body: JSON.stringify({
		 		uid: this.profile.uid,
		 	})
		 })
		 .then(response => response.json())
		 .then(response => {
		 	this.logout()
		 })
		 .catch(error => console.log);
	}

	postSettingsProfile = () => {
		let successful = false;
		 fetch(`${this.server}/settingsprofile`, {
		 	method: 'post',
		 	headers: {'Content-Type': 'application/json'},
		 	body: JSON.stringify({
		 		uid: this.profile.uid,
		 		display: this.settingsForm.profile.display,
		 		currentPassword: this.settingsForm.profile.currentPassword,
		 		newPassword: this.settingsForm.profile.newPassword,
		 		newPasswordRepeat: this.settingsForm.profile.newPasswordRepeat
		 	})
		 }).then(response => {
		 	if (response.status === 200){
		 		successful = true;
		 	}
		 	return response.json();
		 }).then(response => {
		 	if (!successful){
		 		this.settingsForm.profile.response = response;
		 	} else {
		 		this.profile = response;
		 	}
		 }).catch(error => console.log);
	}

	postAddGoal = () => {
		let successful = false;
		 fetch(`${this.server}/addgoal`, {
		 	method: 'post',
		 	headers: {'Content-Type': 'application/json'},
		 	body: JSON.stringify({
		 		uid: this.profile.uid,
		 		visionItemId: this.addGoalForm.visionItemId,
		 		name: this.addGoalForm.name,
		 		description: this.addGoalForm.description,
		 		plans: this.addGoalForm.plans,
		 		start: this.addGoalForm.start,
		 		end: this.addGoalForm.end
		 	})
		 }).then(response => {
		 	if (response.status === 200){
		 		successful = true;
		 	}
		 	return response.json();
		 }).then(response => {
		 	if (!successful){
		 		this.addGoalForm.response = response;
		 	} else {
		 		this.root.store.domain.goalData.push(response);
		 		$('#modal-add-goal').modal('hide');
		 	}
		 }).catch(error => console.log);
	}

	postAddVisionNote = () => {
		 fetch(`${this.server}/addvisionnote`, {
		 	method: 'post',
		 	headers: {'Content-Type': 'application/json'},
		 	body: JSON.stringify({
		 		uid: this.profile.uid,
		 		visionItemId: this.addVisionNoteForm.visionItemId,
		 		noteText: this.addVisionNoteForm.text
		 	})
		 }).then(response => response.json()
		 ).then(response => {
		 	this.addVisionNoteForm.response = response;
		 	for (let i = 0; i < this.visionData.items.length; i++){
		 		const item = this.visionData.items[i];
		 		if (item.id === this.addVisionNoteForm.visionItemId){
		 			item.notes = this.addVisionNoteForm.text;
		 		}
		 	}
		 }).catch(error => console.log);
	}
}

decorate(DomainStore, {
	loginForm: observable,
	registrationForm: observable,
	addVisionCategoryForm: observable,
	addVisionItemForm: observable,
	settingsForm: observable,
	connected: observable,
	visionData: observable,
	goalData: observable,
	addGoalForm: observable,
	addVisionNoteForm: observable,
	visionCategories: computed,
	visionItems: computed,
})

export default DomainStore;