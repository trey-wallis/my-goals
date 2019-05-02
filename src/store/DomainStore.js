import { observable, decorate, computed} from "mobx";

import $ from 'jquery';
import Connection from '../connection/Connection';

class DomainStore {

	constructor(root){
		this.root = root;

		this.goalData = [];
		this.habitData = [];
		this.taskData = [];

		this.visionData = {
			categories: [],
			items: []
		};

		this.profile = {
			displayName : "",
		}

		this.connection = new Connection();

		this.editCategoryForm = {
			id: -1,
			name: "",
			response: "",
		}

		this.editVisionItemForm = {
			categoryId: -1,
			visionItems: [],
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

		this.addGoal = {
			menu: 0,
			response: "",
			visionNote: "",
			form: {
				visionCategory: 0,
				visionItem: 0,
				name: "",
				description: "",
				plans: "",
				start: "",
				end: "",
				progressTracking: 0,
				progressTotal: 21,
			}

		}

		this.editGoal = {
			menu: 0,
			visionNote: "",
			form: {
				selectedId: -1,
				visionCategory: 0,
				visionItem: 0,
				name: "",
				description: "",
				plans: "",
				start: "",
				end: "",
				progressTracking: 0,
				progressTotal: 0,
			}
		}

		this.addVisionNoteForm = {
			text: "",
			response: "",
			visionItemId: 0
		}
	}

	get addGoalMenuOption(){
		if (this.addGoal.menu === 4)
			return "Save";
		else 
			return "Next";
	}

	get editGoalMenuOption(){
		if (this.editGoal.menu === 4)
			return "Save";
		else 
			return "Next";
	}

	get visionCategoryName(){
		const category = this.visionData.categories.filter(category => category.id === this.editCategoryForm.id)[0];
		return category.name;
	}

	postLogout = () => {
		this.connection.postAuthorized("logout")
		.then(response => {
			if (response.status === 200){
				this.connection.connected = false;
				this.connection.clearSession();
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

	fetchHabits = () => {
		this.connection.postAuthorized("habits")
		.then(response => {
			if (response.status === 200){
				this.habitData = response.data;
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

	login = (profile) => {
		this.profile = profile;
		this.connection.connected = true;
		this.fetchVisionBoard();
		this.fetchGoals();
		this.fetchHabits();
	}

	connectLogin = () => {
		this.connection.post("login", {
			username: this.loginForm.username,
			password: this.loginForm.password
		})
		.then(response => {
			const {data} = response;
			if (response.status === 200){
				this.connection.saveSession(data.sessionkey, data.uid);
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
				this.connection.saveSession(data.sessionkey, data.uid);
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


	postHabit = (goalId, date) => {
		this.connection.postAuthorized("updatehabit", {
			goalId: goalId,
			date: date
		})
		.then(response => {
			const {data} = response;
			if (response.status === 200){
				if (data === "Success"){
					const filtered = this.habitData.filter(habit => {
						if (habit.goal_id === goalId){
							if (new Date(habit.date).getTime() === (date.getTime() - (date.getTimezoneOffset() * 60000))){
								return false;
							}
						}
						return true;
					});
					this.habitData = filtered;
				} else {
					this.habitData.push(data);
				}
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
				//When we first register an account, if we add a value, we need to update the default category Id
				if (this.visionData.categories === 0){
					this.addVisionItemForm.categoryId = this.data.categories[0].id;
				}
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
		this.connection.postAuthorized("addgoal", this.addGoal.form)
		.then(response => {
			const {data} = response;
			if (response.status === 200){
		 		this.goalData.push(data);
		 		this.addGoal.menu = 0; //reset the menu to the start
		 		$('#modal-add-goal').modal('hide');
		 		alert("Added goal!");
			} else {
				this.addGoal.response = data;
			}
		})
		.catch(error => console.log);
	}

	postDeleteVisionItem = (id) => {
		this.connection.postAuthorized("deletevisionitem", {
			id: id
		})
		.then(response => {
			if (response.status === 200){
				const filtered = this.visionData.items.filter(item => item.id !== id);
				this.visionData.items = filtered;
				this.root.store.ui.deleteVisionItemId = this.visionData.items[0].id; //if we delete the first item from the list
				//we want to update the value
		 		alert("Deleted vision item!");
			} else {
				alert("An error occurred while deleting the item");
			}
		})
		.catch(error => console.log);
	}

	postDeleteVisionCategory = (id) => {
		this.connection.postAuthorized("deletevisioncategory", {
			deleteId: id
		})
		.then(response => {
			if (response.status === 200){
				const filtered = this.visionData.categories.filter(category => category.id !== id);
				this.visionData.categories = filtered;
		 		alert("Deleted vision category!");
			} else {
				alert("An error occurred while deleting the category");
			}
		})
		.catch(error => console.log);
	}

	postEditGoal = () => {
		this.connection.postAuthorized("editgoal", this.editGoal.form)
		.then(response => {
			if (response.status === 200){
				const goal = this.goalData.filter(goal => goal.id === this.editGoal.form.selectedId)[0];
				goal.name = this.editGoal.form.name;
				goal.description = this.editGoal.form.description;
				goal.plans = this.editGoal.form.plans;
				goal.starttime = this.editGoal.form.start;
				goal.endtime = this.editGoal.form.end;
				goal.progress_tracking = this.editGoal.form.progressTracking;
				goal.progresstotal = this.editGoal.form.progressTotal;
				goal.visionid = this.editGoal.form.visionItem;

		 		this.editGoal.menu = 0; //reset the menu to the start
		 		$('#modal-edit-goal').modal('hide');
		 		alert("Saved goal!");
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
		})
		.then(response => {
			const {data} = response;
		 	if (response.status === 200){
		 		for (let i = 0; i < this.visionData.categories.length; i++){
		 			if (this.visionData.categories[i].id === this.editCategoryForm.id){
		 				//f (this.editCategoryForm.deleteId !== -1){
		 				//	this.visionData.categories.splice(i);
		 				//	this.editCategoryForm.deleteId = -1;
		 				//} else {
		 					this.visionData.categories[i].name = this.editCategoryForm.name;
		 				//}
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

	postDeleteGoal = (id) => {
		this.connection.postAuthorized("deletegoal", {
			id: id
		})
		.then(response => {
			if (response.status === 200){
				for (let i = 0; i < this.goalData.length; i++){
					const goal = this.goalData[i];
					if (goal.id === id){
						this.goalData.splice(i, 1);
						break;
					}
				}
				alert("Deleted goal!");
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
	visionData: observable,
	goalData: observable,
	addGoal: observable,
	editGoal: observable,
	addGoalMenuOption: computed,
	addVisionNoteForm: observable,
	editCategoryForm: observable,
	editVisionItemForm: observable,
	visionCategoryName: computed,
	habitData: observable,
})

export default DomainStore;