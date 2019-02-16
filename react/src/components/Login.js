import React, {Component} from 'react';
import {observer} from 'mobx-react';

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
		const style_response =  {
			height: '25px',
			marginTop: '-15px',
		}
		return(
			<div className="menu bg-light d-flex justify-content-center align-items-center">
				<div className="wrapper">
					<h4 className="text-center">Login</h4>
					<div className="form-group">
						<input type="text" placeholder="Username" className="form-control" onChange={(e)=>{this.onChangeUsername(e)}}/>
					</div>
					<div className="form-group">
						<input type="password" placeholder="Password" className="form-control" onChange={(e)=>{this.onChangePassword(e)}}/>
					</div>
					<div className="text-danger" style={style_response}>{this.domain.loginResponse}</div>
					<button className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
				</div>
			</div>);
	}
}

export default observer(Login);