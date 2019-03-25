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
		this.ui.navItemActive = 2; //Goals will be highlighted
		this.ui.dropDown.id = 2; //What does this do?
	}

	renderGoals = () => {
			//Iterate through all the goals
			return this.domain.goalData.map((goal, i) => {
				const visionItem = this.domain.visionData.items.filter(item => item.id === goal.visionid)[0];

				let goalProgress = 0;
				if (goal.progresstotal !== 0){
					goalProgress = parseInt((goal.progresscount / goal.progresstotal) * 100);
				}

				let style = "progress-bar";
				if (goal.progresscount === goal.progresstotal){
					style = "progress-bar bg-success";
					if (this.ui.filterCompletedGoals === true){
						return '';
					}
				}

				return <GoalItem key={i} index={i} id={goal.id} name={goal.name} visionItemTitle={visionItem.title} visionItemUrl={visionItem.url} progress={goalProgress}
							progressLabel={goal.progresslabel} progressTotal={goal.progresstotal} progressCount={goal.progresscount}
							startTime={goal.starttime} endTime={goal.endtime} plans={goal.plans} description={goal.description} progressStyle={style}/>
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
			<div className="Goals">
				<div className="container p-4 bg-white">
					<h3 className="text-center mb-4">Goals</h3>
					{this.domain.visionData.items.length > 0 ?
						this.renderBoard() : this.renderNoCategories()}
				</div>
				<AddGoal/>
				<EditGoal/>
			</div>);
	}
}

export default observer(Goals);