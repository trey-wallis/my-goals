import React, {Component} from 'react';
import {observer} from 'mobx-react';
import $ from 'jquery';

import '../css/Registration.css';
import RootStore from '../store/RootStore';

class Register extends Component {

	constructor(){
		super();
		let {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;

		//Reset inputs on refresh
		this.domain.registrationForm.username = "";
		this.domain.registrationForm.password = "";
		this.domain.registrationForm.passwordRepeat = "";
		this.domain.registrationForm.response = "";
	}

	componentDidMount(){
		$('.navbar-collapse').collapse('hide');
		this.ui.navItemActive = 2;
	}

	onSubmit = () => {
		this.domain.registrationForm.response = "Registering account...";
		this.domain.connectRegister();
	}


	onChangeUsername = (e) => {
		this.domain.registrationForm.username = e.target.value;
	}

	onChangePassword = (e) => {
		this.domain.registrationForm.password = e.target.value;
	}

	onChangePasswordRepeat = (e) =>  {
		this.domain.registrationForm.passwordRepeat = e.target.value;
	}

	render(){
		return(
			<div className="container d-flex justify-content-center align-items-center">
				<div className="Registration__wrapper">
					<h4 className="text-center text-dark">Register</h4>
					<div className="form-group">
						<input type="text" placeholder="Username" className="form-control" onChange={(e)=>{this.onChangeUsername(e)}}/>
					</div>
					<div className="form-group">
						<input type="password" placeholder="Password" className="form-control" onChange={(e)=>{this.onChangePassword(e)}}/>
					</div>
					<div className="form-group">
						<input type="password" placeholder="Password Repeat" className="form-control" onChange={(e)=>{this.onChangePasswordRepeat(e)}}/>
					</div>
					<div className="text-danger Registration__response">{this.domain.registrationForm.response}</div>
					<button className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
				</div>
			</div>);
	}
}

export default observer(Register);