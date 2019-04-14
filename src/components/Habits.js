import React, {Component} from 'react';

import RootStore from '../store/RootStore';
import HabitContainer from './habit/HabitContainer';
import '../css/Habits.css';
import $ from 'jquery';

class Habits extends Component {

	componentDidMount(){
		$('.navbar-collapse').collapse('hide');
		RootStore.store.ui.navItemActive = 3;
		RootStore.store.ui.dropDown.id = 0;
	}

	render(){
		const filtered = RootStore.store.domain.goalData.filter(goal => goal.progress_tracking === 0);
		return(
			<div className="Habits">
				<div className="container pt-4 bg-white h-100">
					<h3 className="text-center">Habits</h3>
					<div className="d-flex justify-content-center">
						{filtered.length > 0 ?
						<HabitContainer/> : 'There are no habits to display'}
					</div>
				</div>
			</div>);
	}
}

export default Habits;