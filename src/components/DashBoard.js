import React, {Component} from 'react';
import {observer} from 'mobx-react';
import '../css/DashBoard.css';

import $ from 'jquery';
import RootStore from '../store/RootStore';
class DashBoard extends Component {

	constructor(){
		super();
		const {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
	}

	componentDidMount(){
		$('.navbar-collapse').collapse('hide');
		this.ui.navItemActive = 0;
		this.ui.changeDropDownMenu("brandbar", "My Goals");
		this.domain.getCategories();
		this.domain.getGoals();
	}

	render(){
		return(
		<div className="DashBoard">
			<div className="container bg-white d-flex flex-column align-items-center text-primary h-100">
				<div className="w-100 p-4 text-center mb-1">
					<h3 className="text-dark">Dashboard</h3>
					<h6 className="lead">Welcome {this.domain.displayName}</h6>
				</div>
				<div className="row w-100 my-2">
					<div className="col-4">
						<div className="display-4 text-center">{this.domain.visionCategories.length}</div>
						<h5 className="text-black text-center">Current Categories</h5>
					</div>
					<div className="col-4">
						<div className="display-4 text-center">{this.domain.goals.length}</div>
						<h5 className="text-black text-center">Current Goals</h5>
					</div>
					<div className="col-4">
						<div className="display-4 text-center">0</div>
						<h5 className="text-black text-center">Current Habits</h5>
					</div>
				</div>
			</div>
		</div>);
	}
}

export default observer(DashBoard);