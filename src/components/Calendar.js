import React, {Component} from 'react';

import RootStore from '../store/RootStore';
import $ from 'jquery';

class Calendar extends Component {

	constructor(){
		super();
		const {domain, ui} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
	}

	componentDidMount(){
		$('.navbar-collapse').collapse('hide');
		this.ui.navItemActive = 4;
		this.ui.dropDown.id = 4;
	}

	render(){
		return(
			<div className="Calendar">
				<div className="d-flex flex-column align-items-center p-4">
					<h3 className="mb-3">Calendar</h3>
				</div>
			</div>);
	}
}

export default Calendar;