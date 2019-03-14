import { observable, decorate, computed} from "mobx";

import $ from 'jquery';
import Connection from '../connection/Connection';
import Profile from './Profile';

class DomainStore {

	constructor(root){
		this.root = root;

		this.displayName = "";

		this.goalData = [];

		this.visionData = {
			categories: [],
			items: []
		};

		this.profile = new Profile();
		this.connection = new Connection(this.profile);

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

	get visionCategoryName(){
		const category = this.visionData.categories.filter(category => category.id === this.editCategoryForm.id)[0];
		return category.name;
	}

	postLogout = () => {
		this.connection.postAuthorized("logout")
		.then(response => {
			if (response.status === 200){
				this.connected = false;
				this.profile.clearProfile();
			}
		})
		.catch(err => console.log);
	}

	fetchVisionBoard = () => {
		this.connection.postAuthorized("visionboard")
		.then(response => {
			if (response.status === 200){
				this.visionData = response.data;
				if (this.visionData.categories.length > 0){
				 	this.addVisionItemForm.categoryId = this.visionData.categories[0].id;
				 }
			}
		})
		.catch(err => console.log);
	}

	fetchGoals = () => {
		this.connection.postAuthorized("goals")
		.then(response => {
			if (response.status === 200){
				this.goalData = response.data;
			}
		})
		.catch(err => console.log);
	}

	checkLogin = () => {
		this.connection.postAuthorized('checklogin')
		.then(response => {
			if (response.status === 200){
				this.login(response.data);
			}
		})
		.catch(err => console.log);
	}

	login = (data) => {
		this.displayName = data.display;
		this.connected = true;
		this.fetchVisionBoard();
		this.fetchGoals();
	}

	connectLogin = () => {
		this.connection.post("login", {
			username: this.loginForm.username,
			password: this.loginForm.password
		})
		.then(response => {
			const {data} = response;
			if (response.status === 200){
				this.profile.saveProfile(data.sessionkey, data.uid);
				this.login(data);
			} else {
				this.loginForm.response = data;
			}
		})
		.catch(err => this.loginForm.response = "Unable to connect");
	}

	connectRegister = () => {
		this.connection.post("register", {
			username: this.registrationForm.username,
			password: this.registrationForm.password,
			passwordRepeat: this.registrationForm.passwordRepeat
		})
		.then(response => {
			const {data} = response;
			if (response.status === 200){
				this.profile.saveProfile(data.sessionkey, data.uid);
				this.login(data);
			} else {
				this.registrationForm.response = data;
			}
		})
		.catch(err => this.registrationForm.response = "Unable to connect");
	}

	fetchNote = () => {
		this.connection.postAuthorized("visionnote", {
			visionItemId: this.addVisionNoteForm.visionItemId
		})
		.then(response => {
			if (response.status === 200){
				this.addVisionNoteForm.text = response.data;
				$("#modal-add-vision-note").modal('show');
			}
		})
		.catch(error => console.log);
	}

	/*
	* Post Methods
	*/
	postAddCategory = () => {
		this.connection.postAuthorized("addvisioncategory", {
			name: this.addVisionCategoryForm.name
		})
		.then(response => {
			const {data} = response;
			if (response.status === 200){
		 		this.visionData.categories.push(data);
		 		$("#add-vision-category-name").val('');
		 		$("#modal-add-vision-category").modal('hide');
		 		this.addVisionCategoryForm.name = "";
		 		this.addVisionCategoryForm.response = "";
		 		this.root.store.ui.dropDownMenu.items.push(this.visionData.categories[this.visionData.categories.length - 1].name);
		 		this.root.store.ui.updateDropDownMenu();
			} else {
				this.addVisionCategoryForm.response = data;
			}
		})
		.catch(error => console.log);
	}

	postAddVisionItem = () => {
		this.connection.postAuthorized("addvisionitem", {
			name: this.addVisionItemForm.name,
		 	description: this.addVisionItemForm.description,
		 	url: this.addVisionItemForm.url,
		 	categoryId: this.addVisionItemForm.categoryId
		})
		.then(response => {
			const {data} = response;
			if (response.status === 200){
		 		this.visionData.items.push(data);
		 		$("#modal-add-vision-item").modal('hide'); 
		 		this.addVisionItemForm.name = "";
				this.addVisionItemForm.description = "";
				this.addVisionItemForm.url = "";
				this.addVisionItemForm.response = "";
			} else {
				this.addVisionItemForm.response = data;
			}
		})
		.catch(error => console.log);
	}

	postAddGoal = () => {
		this.connection.postAuthorized("addgoal", {
		 	visionItemId: this.addGoalForm.visionItemId,
		 	name: this.addGoalForm.name,
		 	description: this.addGoalForm.description,
		 	plans: this.addGoalForm.plans,
		 	start: this.addGoalForm.start,
		 	end: this.addGoalForm.end
		})
		.then(response => {
			const {data} = response;
			if (response.status === 200){
		 		this.goalData.push(data);
		 		$('#modal-add-goal').modal('hide');
			} else {
				this.addGoalForm.response = data;
			}
		})
		.catch(error => console.log);
	}

	postAddVisionNote = () => {
		this.connection.postAuthorized("addvisionnote", {
		 	visionItemId: this.addVisionNoteForm.visionItemId,
		 	noteText: this.addVisionNoteForm.text
		})
		.then(response => {
			const {data} = response;
			if (response.status === 200){
			 	this.addVisionNoteForm.response = data;
			 	for (let i = 0; i < this.visionData.items.length; i++){
			 		const item = this.visionData.items[i];
			 		if (item.id === this.addVisionNoteForm.visionItemId){
			 			item.notes = this.addVisionNoteForm.text;
			 		}
			 	}
			} else {
				console.log(data);
			}
		})
		.catch(error => console.log);
	}

	editVisionCategory = () => {
		this.connection.postAuthorized("editvisioncategory", {
		 	id: this.editCategoryForm.id,
		 	name: this.editCategoryForm.name,
		 	deleteId: this.editCategoryForm.deleteId,
		})
		.then(response => {
			const {data} = response;
		 	if (response.status === 200){
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
		 		this.editCategoryForm.response = data;
		 	}
		})
		.catch(error => console.log);
	}

	editVisionItem = () => {
		this.connection.postAuthorized("editvisionitem", {
		 	visionItems: this.editVisionItemForm.visionItems,
		})
		.then(response => {
			const {data} = response;
		 	if (response.status === 200){
		 		for (let i = 0; i < this.visionData.items.length; i++){
		 			const item = this.visionData.items[i];
		 			for (let j = 0; j < this.editVisionItemForm.visionItems.length; j++){
		 				const innerItem = this.editVisionItemForm.visionItems[j];
		 				if (item.id === innerItem.id){
		 					item.title = innerItem.title;
		 					item.description = innerItem.description;
		 					item.url = innerItem.url;
		 					item.categoryid = innerItem.categorySelectedId;
		 				}
		 			}
		 		}
		 		$("#modal-edit-vision-item").modal('hide');
		 	} else {
		 		this.editVisionItemForm.response = data;
		 	}
		})
		.catch(error => console.log);
	}

	progress = (id, progress) => {
		this.connection.postAuthorized("updateprogress", {
			id: id,
			progress: progress
		})
		.then(response => {
		 	if (response.status === 200){
		 		const goal = this.goalData.filter(goal => goal.id === id)[0];
		 		goal.progress = progress;
		 	} 
		})
		.catch(error => console.log);
	}
}

decorate(DomainStore, {
	loginForm: observable,
	registrationForm: observable,
	addVisionCategoryForm: observable,
	addVisionItemForm: observable,
	connected: observable,
	visionData: observable,
	goalData: observable,
	addGoalForm: observable,
	addVisionNoteForm: observable,
	editCategoryForm: observable,
	editVisionItemForm: observable,
	visionCategoryName: computed,
})

export default DomainStore;