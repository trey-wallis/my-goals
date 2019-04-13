import React, {Component} from 'react';

import RootStore from '../store/RootStore';
import HabitContainer from './habit/HabitContainer';
import '../css/Habits.css';
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
		this.ui.dropDown.id = 0;
	}

	render(){
		return(
			<div className="Habits">
				<div className="container pt-4 bg-white h-100">
						<h3 className="text-center">Habits</h3>
						<div className="d-flex justify-content-center">
						<HabitContainer/>
					</div>
				</div>
			</div>);
	}
}

export default Habits;