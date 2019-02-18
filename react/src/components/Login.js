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
		this.domain.connectLogin();
	}

	onChangeUsername = (e) => {
		this.domain.user = e.target.value;
	}

	onChangePassword = (e) => {
		this.domain.pass = e.target.value;
	}

	render(){
		const style_response =  {
			minHeight: '25px',
			marginTop: '-15px',
		}

		const style_wrapper = {
			width: '250px'
		}

		return(
			<div className="menu bg-light d-flex justify-content-center align-items-center">
				<div className="wrapper" style={style_wrapper}>
					<h4 className="text-center">Login</h4>
					<div className="form-group">
						<input type="text" placeholder="Username" className="form-control" onChange={(e)=>{this.onChangeUsername(e)}}/>
					</div>
					<div className="form-group">
						<input type="password" placeholder="Password" className="form-control" onChange={(e)=>{this.onChangePassword(e)}}/>
					</div>
					<div className="text-danger" style={style_response}>{this.domain.response}</div>
					<button className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
				</div>
			</div>);
	}
}

export default observer(Login);