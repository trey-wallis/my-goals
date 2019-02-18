import React, {Component} from 'react';
import {observer} from 'mobx-react';

import '../css/Registration.css';
import RootStore from '../store/RootStore';

class Register extends Component {

	constructor(){
		super();
		let {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
	}

	onSubmit = () => {
		this.domain.connectRegister();
	}


	onChangeUsername = (e) => {
		this.domain.registrationUsername = e.target.value;
	}

	onChangePassword = (e) => {
		this.domain.registrationPassword = e.target.value;
	}

	onChangePasswordRepeat = (e) =>  {
		this.domain.registrationPasswordRepeat = e.target.value;
	}

	render(){
		return(
			<div className="menu bg-light d-flex justify-content-center align-items-center">
				<div className="Registration__wrapper">
					<h4 className="text-center">Register</h4>
					<div className="form-group">
						<input type="text" placeholder="Username" className="form-control" onChange={(e)=>{this.onChangeUsername(e)}}/>
					</div>
					<div className="form-group">
						<input type="password" placeholder="Password" className="form-control" onChange={(e)=>{this.onChangePassword(e)}}/>
					</div>
					<div className="form-group">
						<input type="password" placeholder="Password Repeat" className="form-control" onChange={(e)=>{this.onChangePasswordRepeat(e)}}/>
					</div>
					<div className="text-danger Registration__response">{this.domain.registrationResponse}</div>
					<button className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
				</div>
			</div>);
	}
}

export default observer(Register);