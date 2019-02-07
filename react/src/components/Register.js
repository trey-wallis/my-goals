import React, {Component} from 'react';
import {observer} from 'mobx-react';
import '../css/Register.css';

import RootStore from '../store/RootStore';

class Register extends Component {

	constructor(){
		super();
		let {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
	}

	onSubmit = () => {
		this.domain.register();
	}


	onChangeUsername = (e) => {
		this.registerUser = e.target.value;
	}

	onChangePassword = (e) => {
		this.registerPass = e.target.value;
	}

	onChangePasswordRepeat = (e) =>  {
		this.registerPassRepeat = e.target.value;
	}

	render(){
		return(
			<div className="Register">
				<div className="Register__wrapper">
					<div className="Register__title">Register</div>
					<div className="Register__item">
						<input type="text" placeholder="Username" onChange={(e)=>{this.onChangeUsername(e)}}/>
					</div>
					<div className="Register__item">
						<input type="password" placeholder="Password" onChange={(e)=>{this.onChangePassword(e)}}/>
					</div>
					<div className="Register__item">
						<input type="password" placeholder="Password Repeat" onChange={(e)=>{this.onChangePasswordRepeat(e)}}/>
					</div>
					<button className="Register__button" onClick={this.onSubmit}>Submit</button>
					<div className="Register__status">{this.domain.registerResponse}</div>
				</div>
			</div>);
	}
}

export default observer(Register);