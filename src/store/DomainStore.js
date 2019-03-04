import { observable, decorate, computed } from "mobx";
import $ from 'jquery';

class DomainStore {

	constructor(root){
		this.hostname = "https://my-goals-api.herokuapp.com";

		this.root = root;
		this.connected = false;

		this.goalData = [];

		this.visionData = {
			categories: [],
			items: []
		};

		this.profile = {
			uid: 0,
			display: "",
		}

		this.editCategoryForm = {
			id: -1,
			name: "",
			deleteId: -1,
			response: "",
		}

		this.editVisionItemForm = {
			categoryId: -1,
			visionItems: [],
			delete: [],
			itemIndex: 0,
			response: "",
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

	visionCategoryName(id){
		const category = this.visionData.categories.filter(category => category.id === id)[0];
		return category.name;
	}

	checkLogin = () => {
		let status;
		if (window.sessionStorage.getItem('uid') > 0) {
		 	fetch(`${this.hostname}/checkLogin`, {
		 		method: 'post',
		 		headers: {'Content-Type': 'application/json'},
		 		body: JSON.stringify({
		 			uid: window.sessionStorage.getItem('uid')
		 		})
		 	})
		 .then(response => {
		 	status = response.status;
		 	return response.json();
		 })
		 .then(response => {
		 	if (status === 200){
		 		this.profile = response;
		 		this.connected = true;
		 	} else {
		 		console.log(response);
		 	}
		 })
		 .catch(error => console.log);
		}
	}

	/*
	* Connection Methods
	*/
	connectLogin = () => {
		let status;
		 fetch(`${this.hostname}/signin`, {
		 	method: 'post',
		 	headers: {'Content-Type': 'application/json'},
		 	body: JSON.stringify({
		 		username: this.loginForm.username,
		 		password: this.loginForm.password
		 	})
		 })
		 .then(response => {
		 	status = response.status;
		 	return response.json();
		 })
		 .then(response => {
		 	if(status === 200){
		 		this.profile = response;
		 		window.sessionStorage.setItem('uid', this.profile.uid);
				this.connected = true;
		 	} else {
		 		this.loginForm.response = response;
		 	}
		 })
		 .catch(err => this.loginForm.response = "Unable to connect to api");
	}

	connectRegister = () => {
		let status;
		 fetch(`${this.hostname}/register`, {
		 	method: 'post',
		 	headers: {'Content-Type': 'application/json'},
		 	body: JSON.stringify({
		 		username: this.registrationForm.username,
		 		password: this.registrationForm.password,
		 		passwordRepeat: this.registrationForm.passwordRepeat
		 	})
		 })
		 .then(response => {
		 	status = response.status;
		 	return response.json();
		 })
		 .then(response => {
		 	if (status === 200){
		 		this.profile = response;
		 		window.sessionStorage.setItem('uid', this.profile.uid);
				this.connected = true;
		 	} else {
		 		this.registrationForm.response = response;
		 	}
		 })
		 .catch(err => this.registrationForm.response = "Unable to connect to api");
	}

	/*
	* Get resource methods
	*/
	getCategories = () => {
		 fetch(`${this.hostname}/visionboard/` + this.profile.uid)
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
		fetch(`${this.hostname}/goals`, {
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
		fetch(`${this.hostname}/note`, {
		 	method: 'post',
		 	headers: {'Content-Type': 'application/json'},
		 	body: JSON.stringify({
		 		uid: this.profile.uid,
		 		visionItemId: this.addVisionNoteForm.visionItemId
		 	})
		 })
		 .then(response => response.json())
		 .then(response => {
		 	if (response !== null){
		 		this.addVisionNoteForm.text = response;
		 	}
		 	$("#modal-add-vision-note").modal('show');
		 })
		 .catch(error => console.log);
	}

	/*
	* Post Methods
	*/
	postAddCategory = () => {
		let successful = false;
		fetch(`${this.hostname}/addvisioncategory`, {
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
		fetch(`${this.hostname}/addvisionitem`, {
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
		fetch(`${this.hostname}/logout`, {
		 	method: 'post',
		 	headers: {'Content-Type': 'application/json'},
		 	body: JSON.stringify({
		 		uid: this.profile.uid,
		 	})
		 })
		 .then(response => response.json())
		 .then(response => {
			window.sessionStorage.setItem('uid', 0);
			this.connected = false;
		 })
		 .catch(error => console.log);
	}

	postSettingsProfile = () => {
		let successful = false;
		 fetch(`${this.hostname}/settingsprofile`, {
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
		 fetch(`${this.hostname}/addgoal`, {
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
		 fetch(`${this.hostname}/addvisionnote`, {
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

	editVisionCategory = () => {
		let status;
		 fetch(`${this.hostname}/editvisioncategory`, {
		 	method: 'post',
		 	headers: {'Content-Type': 'application/json'},
		 	body: JSON.stringify({
		 		uid: this.profile.uid,
		 		id: this.editCategoryForm.id,
		 		name: this.editCategoryForm.name,
		 		deleteId: this.editCategoryForm.deleteId,
		 	})
		 })
		 .then(response => {
		 	status = response.status;
		 	return response.json();
		 })
		 .then(response => {
		 	if (status === 200){
		 		for (let i = 0; i < this.visionData.categories.length; i++){
		 			if (this.visionData.categories[i].id === this.editCategoryForm.id){
		 				if (this.editCategoryForm.deleteId !== -1){
		 					this.visionData.categories.splice(i);
		 					this.editCategoryForm.deleteId = -1;
		 				} else {
		 					this.visionData.categories[i].name = this.editCategoryForm.name;
		 				}
		 			}
		 		}
		 		$("#modal-edit-vision-category").modal('hide');
		 	} else {
		 		this.editCategoryForm.response = response;
		 	}
		 })
		 .catch(err => this.editCategoryForm.response = "Unable to connect to api");
	}

	editVisionItem = () => {
		let status;
		 fetch(`${this.hostname}/editvisionitem`, {
		 	method: 'post',
		 	headers: {'Content-Type': 'application/json'},
		 	body: JSON.stringify({
		 		uid: this.profile.uid,
		 		visionItems: this.editVisionItemForm.visionItems,
		 	})
		 })
		 .then(response => {
		 	status = response.status;
		 	return response.json();
		 })
		 .then(response => {
		 	if (status === 200){
		 		for (let i = 0; i < this.visionData.items.length; i++){
		 			const item = this.visionData.items[i];
		 			for (let j = 0; j < this.editVisionItemForm.visionItems.length; j++){
		 				const innerItem = this.editVisionItemForm.visionItems[j];
		 				if (item.id === innerItem.id){
		 					item.title = innerItem.title;
		 					item.description = innerItem.description;
		 					item.url = innerItem.url;
		 					item.categoryid = innerItem.newCategory;
		 				}
		 			}
		 		}
		 		$("#modal-edit-vision-item").modal('hide');
		 	} else {
		 		this.editVisionItemForm.response = response;
		 	}
		 })
		 .catch(err => this.editVisionItemForm.response = "Unable to connect to api");
	}

	progress = (id, progress) => {
		let status;
		 fetch(`${this.hostname}/progress`, {
		 	method: 'post',
		 	headers: {'Content-Type': 'application/json'},
		 	body: JSON.stringify({
		 		uid: this.profile.uid,
		 		id: id,
		 		progress: progress
		 	})
		 })
		 .then(response => {
		 	status = response.status;
		 	return response.json();
		 })
		 .then(response => {
		 	if(status === 200){
		 		const goal = this.goalData.filter(goal => goal.id === id)[0];
		 		goal.progress = progress;
		 	}
		 })
		 .catch(err => console.log);
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
	editCategoryForm: observable,
	editVisionItemForm: observable,
	visionCategories: computed,
	visionItems: computed,
})

export default DomainStore;