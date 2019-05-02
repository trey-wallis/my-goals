import React, {Component} from 'react';
import {observer} from 'mobx-react';

import $ from 'jquery';
import RootStore from '../store/RootStore';

class DashBoard extends Component {

	componentDidMount(){
		$('.navbar-collapse').collapse('hide');
		RootStore.store.ui.navItemActive = 0;
		RootStore.store.ui.dropDown.id = 0;
	}

	render(){
		const totalHabits = RootStore.store.domain.goalData.filter(goal => goal.progress_tracking === 0).length;
		const habitsCompleted = RootStore.store.domain.goalData.filter(goal => {
			if (goal.progress_tracking === 0){
				const progressCount = RootStore.store.domain.habitData.filter(habit => habit.goal_id === goal.id).length;
				if (progressCount === goal.progresstotal){
					return true;
				}
			}
			return false;
		}).length; //optimize this
		const habitsInProgress = totalHabits - habitsCompleted;

		const visionCategoryCount = RootStore.store.domain.visionData.categories.length;
		const visionItemCount = RootStore.store.domain.visionData.items.length;
		const goalCount = RootStore.store.domain.goalData.length;
		const goalsCompleted = habitsCompleted; //Add in goals by tasks
		const goalsInProgress = goalCount - goalsCompleted;

		return(
			<div>
				<div className="d-flex flex-column align-items-center text-primary h-100">
					<div className="w-100 p-4 text-center mb-1">
						<h3 className="text-dark">Dashboard</h3>
						<h6 className="lead">Welcome {RootStore.store.domain.profile.display}</h6>
					</div>
					<div className="row">
						<div className="col-4 mb-4">
							<div className="display-4 text-center">{visionCategoryCount}</div>
							<h5 className="text-black text-center">Vision Categories</h5>
						</div>
						<div className="col-4 mb-4">
							<div className="display-4 text-center">{visionItemCount}</div>
							<h5 className="text-black text-center">Vision Items</h5>
						</div>
						<div className="col-4 mb-4">
							<div className="display-4 text-center">{goalsInProgress}</div>
							<h5 className="text-black text-center">Goals In Progress</h5>
						</div>
						<div className="col-4 mb-4">
							<div className="display-4 text-center">{goalsCompleted}</div>
							<h5 className="text-black text-center">Goals Completed</h5>
						</div>
						<div className="col-4 mb-4">
							<div className="display-4 text-center">{habitsInProgress}</div>
							<h5 className="text-black text-center">Habits in Progress</h5>
						</div>
						<div className="col-4 mb-4">
							<div className="display-4 text-center">{habitsCompleted}</div>
							<h5 className="text-black text-center">Habits Completed</h5>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default observer(DashBoard);