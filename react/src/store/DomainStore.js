import { observable, decorate } from "mobx";

class DomainStore {

	constructor(root){
		this.root = root;
		this.connected = false;
		this.displayName = "Trey";
		this.user = "default";
		this.pass = "default";
		this.passRepeat = "default";
		this.loginResponse = "";
	}

	get loggedIn(){
		return this.connected;
	}

	get name(){
		return this.displayName;
	}

	set username(user){
		this.user = user;
	}

	set password(pass){
		this.pass = pass;
	}

	set passwordRepeat(repeat){
		this.passRepeat = repeat;
	}

	get username(){
		return this.user;
	}

	get password(){
		return this.pass;
	}

	get passwordRepeat(){
		return this.passRepeat
	}

	login = () => {
		fetch('http://localhost:3006/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				username: this.user,
				password: this.pass
			})
		})
		.then(response => response.json())
		.then(response => this.loginResponse = response);
	}
}

decorate(DomainStore, {
	loginResponse: observable
})

export default DomainStore;