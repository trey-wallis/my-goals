import React, {Component} from 'react';
import {observer} from 'mobx-react';

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
			<div className="menu bg-light d-flex justify-content-center align-items-center">
				<div className="wrapper">
					<h4 className="text-center">Register</h4>
					<div className="form-group">
						<input type="text" placeholder="Username" class="form-control" onChange={(e)=>{this.onChangeUsername(e)}}/>
					</div>
					<div className="form-group">
						<input type="password" placeholder="Password" class="form-control" onChange={(e)=>{this.onChangePassword(e)}}/>
					</div>
					<div className="form-group">
						<input type="password" placeholder="Password Repeat" class="form-control" onChange={(e)=>{this.onChangePasswordRepeat(e)}}/>
					</div>
					<button className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
					<div className="text-danger">{this.domain.registerResponse}</div>
				</div>
			</div>);
	}
}

export default observer(Register);