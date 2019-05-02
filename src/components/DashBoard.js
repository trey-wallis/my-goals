import React, {Component} from 'react';
import {observer} from 'mobx-react';

import $ from 'jquery';
import RootStore from '../store/RootStore';

import DashCard from './dashboard/DashCard';

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
			<div className="row no-gutters">
				<div className="col-4">
					<DashCard title="Vision Categories">
						<div className="display-4 text-white text-center">{visionCategoryCount}</div>
					</DashCard>
				</div>
				<div className="col-4">
					<DashCard title="Vision Items">
						<div className="display-4 text-white text-center">{visionItemCount}</div>
					</DashCard>
				</div>
				<div className="col-4">
					<DashCard title="Goals in Progress">
						<div className="display-4 text-white text-center">{goalsInProgress}</div>
					</DashCard>
				</div>
				<div className="col-4">
					<DashCard title="Goals Completed">
						<div className="display-4 text-white text-center">{goalsCompleted}</div>
					</DashCard>
				</div>
				<div className="col-4">
					<DashCard title="Habits In Progress">
						<div className="display-4 text-white text-center">{habitsInProgress}</div>
					</DashCard>
				</div>	
				<div className="col-4">
					<DashCard title="Habits Completed">
						<div className="display-4 text-white text-center">{habitsCompleted}</div>
					</DashCard>
				</div>
			</div>
		);
	}
}

export default observer(DashBoard);