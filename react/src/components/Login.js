import React, {Component} from 'react';
import {observer} from 'mobx-react';
import '../css/Login.css';

import RootStore from '../store/RootStore';

class Login extends Component {

	constructor(){
		super();
		let {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
	}

	onSubmit = () => {
		this.domain.login();
	}

	onChangeUsername = (e) => {
		this.domain.loginUser = e.target.value;
	}

	onChangePassword = (e) => {
		this.domain.loginPass = e.target.value;
	}

	render(){
		return(
			<div className="Login">
				<div className="Login__wrapper">
					<div className="Login__title">Login</div>
					<div className="Login__item">
						<input type="text" placeholder="Username" onChange={(e)=>{this.onChangeUsername(e)}}/>
					</div>
					<div className="Login__item">
						<input type="password" placeholder="Password" onChange={(e)=>{this.onChangePassword(e)}}/>
					</div>
					<button className="Login__button" onClick={this.onSubmit}>Submit</button>
					<div className="Login__status">{this.domain.loginResponse}</div>
				</div>
			</div>);
	}
}

export default observer(Login);