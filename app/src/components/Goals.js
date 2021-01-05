import React, {Component} from 'react';

import {observer} from 'mobx-react';

import $ from 'jquery';

import RootStore from '../store/RootStore';
import GoalItem from '../components/goal/GoalItem';
import AddGoal from '../components/goal/AddGoal';
import EditGoal from '../components/goal/EditGoal';

class Goals extends Component {

	constructor(){
		super();
		const {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
	}

	componentDidMount(){
		$('.navbar-collapse').collapse('hide');
	}

	renderGoals = () => {
			return this.domain.goalData.map((goal, i) => {

				//Get the vision item that this goal is attached to
				const visionItem = this.domain.visionData.items.filter(item => item.id === goal.visionid)[0];

				let progressCount = 0;
				if (goal.progress_tracking === 0){
					progressCount = this.domain.habitData.filter(habit => habit.goal_id === goal.id).length;
				} else {
					const tasks = this.domain.taskData.filter(task => task.goal_id === goal.id);
					progressCount = tasks.filter(task => task.completed === true).length;
				}

				//Calculate the progress of the goal
				const progress = parseInt((progressCount / goal.progresstotal) * 100);

				//This will be our default progress bar style
				let progressBarStyle = "progress-bar";

				//If we have completed our goal based on our measurements
				if (progressCount === goal.progresstotal){

					//Add the success style
					progressBarStyle = "progress-bar bg-success";

					//If we want to filter our goals - then we will return right here and not render them
					if (this.ui.filterGoal.id === this.ui.states.FILTER_GOAL_COMPLETED)
						return '';
				}

				const today = new Date().getTime();
				const endDate = new Date(goal.endtime.substring(0, 10)).getTime();

				//Filter for weekly goals
				if (this.ui.filterGoal.id === this.ui.states.FILTER_GOAL_WEEK){
					if (endDate - today > this.ui.ONE_WEEK_MILLIS)
						return '';
				}

				//Filter for monthly goals
				if (this.ui.filterGoal.id === this.ui.states.fILTER_GOAL_MONTH){
					if (endDate - today > this.ui.ONE_MONTH_MILLIS)
						return '';
				}

				let progressTracking = "Habit";
				if (goal.progress_tracking === 1){
					progressTracking = "Tasks";
				}
				return <GoalItem key={i} index={i} id={goal.id} name={goal.name} visionItemTitle={visionItem.title} visionItemUrl={visionItem.url} progress={progress} progressTracking={progressTracking} progressTotal={goal.progresstotal} progressCount={progressCount} startTime={goal.starttime} endTime={goal.endtime} plans={goal.plans} description={goal.description} progressStyle={progressBarStyle}/>
			});
	}

	renderNoGoals = () => {
		return(
			<p className="text-center">There are no goals to display<br/>
			Would you like to <span className="text-primary" data-toggle="modal" data-target="#modal-add-goal">add</span> a goal?</p>
		);
	}

	renderNoCategories = () => {
		return(
			<p className="text-center">There are no goals to display</p>
		);
	}

	renderBoard = () => {
		if(this.domain.goalData.length > 0){
			return (<div className="row">{this.renderGoals()}</div>);
		} else {
			return this.renderNoGoals()
		}
	}

	render(){
		return(
			<div className="p-4">
				<h3 className="mb-4">My Goals</h3>
				{this.domain.visionData.items.length > 0 ?
					this.renderBoard() : this.renderNoCategories()}
				<AddGoal/>
				<EditGoal/>
			</div>);
	}
}

export default observer(Goals);
