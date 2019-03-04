import React, {Component} from 'react';

import RootStore from '../store/RootStore';
import $ from 'jquery';

class Habits extends Component {

	constructor(){
		super();
		const {domain, ui} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
	}

	componentDidMount(){
		$('.navbar-collapse').collapse('hide');
		this.ui.navItemActive = 3;
		this.ui.changeDropDownMenu("habits", "My Habits");
	}

	render(){
		return(
			<div className="Habits">
				<div className="container bg-white h-100">
					<div className="p-4">
						<h3 className="text-center">Habits</h3>
					</div>
				</div>
			</div>);
	}
}

export default Habits;