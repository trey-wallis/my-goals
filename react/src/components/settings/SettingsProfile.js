import React, {Component} from 'react';

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

	onPassword = (e) => {
		this.domain.settingsPassword = e.target.value;
	}

	onPasswordRepeat = (e) => {
		this.domain.settingsPasswordRepeat = e.target.value;
	}

	onSave = () => {
		this.domain.postSettingsProfile();
	}

	render(){
		return(
			<div className="card" className="w-50 d-flex flex-column align-items-center">
				<h5 className="card-title">Profile</h5>
				<div className="card-body">
					<div className="row">
						<div className="col-3">Display Name</div>
						<div className="col-9">
							<div className="form-group">
								<input type="text" className="form-control form-control-sm" defaultValue={this.domain.displayName} placeholder="Display Name" onChange={this.onDisplay}/>
							</div>
						</div>
						<div className="col-3">Password</div>
						<div className="col-9">
							<div className="form-group">
								<input type="password" className="form-control form-control-sm" placeholder="Password" onChange={this.onPassword}/>
							</div>
						</div>
						<div className="col-3">Password Repeat</div>
						<div className="col-9">
							<div className="form-group">
								<input type="password" className="form-control form-control-sm" placeholder="Password Repeat" onChange={this.onPasswordRepeat}/>
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

export default SettingsProfile;