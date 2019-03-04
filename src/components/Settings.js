import React, {Component} from 'react';

import RootStore from '../store/RootStore';
import SettingsProfile from '../components/settings/SettingsProfile';
import $ from 'jquery';

class Settings extends Component {

	constructor(){
		super();
		const {domain, ui} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
	}

	componentDidMount(){
		$('.navbar-collapse').collapse('hide');
	}

	render(){
		return(
			<div className="menu">
				<div className="container h-100 d-flex flex-column align-items-center">
					<h3 className="my-5">Settings</h3>
					<SettingsProfile />
				</div>
			</div>);
	}
}

export default Settings;