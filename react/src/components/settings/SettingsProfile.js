import React, {Component} from 'react';

import {observer} from 'mobx-react';
import RootStore from '../../store/RootStore';

class SettingsProfile extends Component {

	constructor(){
		super();
		const {domain, ui} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
	}

	onDisplay = (e) => {
		this.domain.settingsDisplay = e.target.value;
	}

	onCurrentPassword = (e) => {
		this.domain.settingsCurrentPassword = e.target.value;
	}

	onNewPassword = (e) => {
		this.domain.settingsNewPassword = e.target.value;
	}

	onNewPasswordRepeat = (e) => {
		this.domain.settingsNewPasswordRepeat = e.target.value;
	}

	onSave = () => {
		if (this.domain.settingsDisplay === '')
			this.domain.settingsDisplay = this.domain.displayName;
		this.domain.postSettingsProfile();
	}

	render(){
		return(
			<div className="card" className="w-50 d-flex flex-column align-items-center">
				<h5 className="card-title">Profile</h5>
				<div className="card-body">
					<div className="row">
						<div className="col-4">Display Name</div>
						<div className="col-8">
							<div className="form-group">
								<input type="text" className="form-control form-control-sm" defaultValue={this.domain.displayName} placeholder="Display Name" onChange={this.onDisplay}/>
							</div>
						</div>
						<div className="col-4">Current Password</div>
						<div className="col-8">
							<div className="form-group">
								<input type="password" className="form-control form-control-sm" placeholder="Current Password" onChange={this.onCurrentPassword}/>
							</div>
						</div>
						<div className="col-4">New Password</div>
						<div className="col-8">
							<div className="form-group">
								<input type="password" className="form-control form-control-sm" placeholder="New Password" onChange={this.onNewPassword}/>
							</div>
						</div>
						<div className="col-4">New Password Repeat</div>
						<div className="col-8">
							<div className="form-group">
								<input type="password" className="form-control form-control-sm" placeholder="New Password Repeat" onChange={this.onNewPasswordRepeat}/>
							</div>
						</div>
						<div className="col-12 d-flex flex-column align-items-end">
							<div className="text-danger">{this.domain.settingsProfileResponse}</div>
							<button className="btn btn-success" onClick={this.onSave}>Save Profile</button>
						</div>
					</div>
				</div>
			</div>);
	}
}

export default observer(SettingsProfile);