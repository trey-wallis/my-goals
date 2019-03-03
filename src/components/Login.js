import React, {Component} from 'react';
import {observer} from 'mobx-react';
import $ from 'jquery';

import '../css/Login.css';
import RootStore from '../store/RootStore';

class Login extends Component {

	constructor(){
		super();
		let {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
		
		//Everytime we refresh we want to clear the form buffer
		this.domain.loginUsername = "";
		this.domain.loginPassword = "";
		this.domain.loginResponse = "";
	}

	componentDidMount(){
		$('.navbar-collapse').collapse('hide');
	}

	onSubmit = () => {
		this.domain.connectLogin();
	}

	onChangeUsername = (e) => {
		this.domain.loginUsername = e.target.value;
	}

	onChangePassword = (e) => {
		this.domain.loginPassword = e.target.value;
	}

	render(){
		return(
			<div className="container d-flex justify-content-center align-items-center">
				<div className="Login__wrapper">
					<h4 className="text-center text-dark">Login</h4>
					<div className="form-group">
						<input type="text" placeholder="Username" className="form-control" onChange={(e)=>{this.onChangeUsername(e)}}/>
					</div>
					<div className="form-group">
						<input type="password" placeholder="Password" className="form-control" onChange={(e)=>{this.onChangePassword(e)}}/>
					</div>
					<div className="text-danger Login__response">{this.domain.loginResponse}</div>
					<button className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
				</div>
			</div>);
	}
}

export default observer(Login);