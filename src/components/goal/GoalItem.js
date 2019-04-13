import React, {Component} from 'react';

import {observer} from 'mobx-react';

import '../../css/GoalItem.css'

import RootStore from '../../store/RootStore';
import ProgressBar from './ProgressBar.js';

import ViewList from '../../icons/view-list.svg';
import Cross from '../../icons/cross.svg';
import DocumentEdit from '../../icons/document-edit.svg';

import $ from 'jquery';

class GoalItem extends Component {

	constructor(){
		super();
		const {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
	}

	deleteGoal = (id) => {
		let deleteGoal = window.confirm("Are you sure you want to delete this goal?");
		if (deleteGoal)
			this.domain.postDeleteGoal(id);
	}

		/*
	* Gets the Current Date and Formats for Input Field Type Date
	*/
	currentDate = () => {
		const today = new Date();
		let dd = today.getDate();
		let mm = today.getMonth()+1; //January is 0!
		const yyyy = today.getFullYear();

		if(dd<10)
			dd='0'+dd
		 if(mm<10)
		 	mm='0'+mm
		 const formatted = '' + yyyy+'-'+mm+'-'+dd + '';
		 return formatted;
	}

	editGoal = (id) => {
		const selectedGoal = this.domain.goalData.filter(goal => goal.id === id)[0];
		const selectedGoalVisionItem = this.domain.visionData.items.filter(item => item.id === selectedGoal.visionid)[0];
		const selectedGoalCategory = this.domain.visionData.categories.filter(cat => cat.id === selectedGoalVisionItem.categoryid)[0];

		this.domain.editGoal.menu = 0;
		this.domain.editGoal.form.selectedId = id;
		this.domain.editGoal.form.name = selectedGoal.name;
		this.domain.editGoal.form.description = selectedGoal.description;
		this.domain.editGoal.form.plans = selectedGoal.plans;
		this.domain.editGoal.form.start = selectedGoal.starttime.substring(0, 10);
		this.domain.editGoal.form.end = selectedGoal.endtime.substring(0,10);	
		this.domain.editGoal.form.visionCategory = selectedGoalCategory.id;
		this.domain.editGoal.form.progressTracking = selectedGoal.progress_tracking;
		this.domain.editGoal.form.progressTotal = selectedGoal.progresstotal;
		this.domain.editGoal.form.visionItem = selectedGoalVisionItem.id;
		this.domain.editGoal.visionNote = selectedGoalVisionItem.notes;

		$('#modal-edit-goal').modal('show');
	}

	getGoal = (id) => {
		return this.domain.goalData.filter(goal => goal.id === id)[0];
	}

	render(){
		const {index, id, name, visionItemTitle, visionItemUrl, progress, progressStyle, progressCount, progressTotal, progressTracking, startTime, endTime, plans, description} = this.props;

		return(
			<div className="col-12 mb-4">
				<div className="media">
					<div className="Goals__side align-self-center">
						<img className="Goals__img mr-4" src={visionItemUrl} alt={visionItemTitle}/>
						<p className="Goals__vision-text text-center text-primary">{visionItemTitle}</p>
					</div>
					<div className="media-body">
					<div className="card border-0">
						<div className="card-body pt-0">
							<div className="d-flex justify-content-between">
								<div className="wrapper">	
									<h6 className="card-title text-primary">{name}</h6>
								</div>
									<div className="d-flex justify-content-end">
										<div className="Goals__icon">
											<img src={DocumentEdit} className="Goals__icon-item" alt="edit" onClick={()=>{this.editGoal(id)}}/>
										</div>
																		<div className="Goals__icon">
									<img src={ViewList} className="Goals__icon-item" alt="viewlist" data-toggle="collapse" data-target={"#goal-info-" + index}/>
								</div>
									</div>
							</div>
							<div className="d-flex justify-content-between">
							<div className="row mb-2">
								<div className="col-sm-6">
									<div className="text-dark">{startTime.substring(0,10)}</div>
								</div>
								<div className="col-sm-6">
									<div className="text-dark">{endTime.substring(0,10)}</div>
								</div>
								<div className="col-sm-6 ">
									<div className="text-dark">{progressTracking}</div>
								</div>
								<div className="col-sm-6">
									<div className="text-dark">{`${progressCount} out of ${progressTotal}`}</div>
								</div>
							</div>
							<div className="d-flex justify-content-end">
								<div className="Goals__icon">
									<img src={Cross} className="Goals__icon-item" alt="cross" onClick={()=>{this.deleteGoal(id)}}/>
								</div>
								</div>
							</div>
							<ProgressBar width={progress} height='15' style={progressStyle}/>
						</div>
					</div>
					<ul id={"goal-info-" + index} className="list-group list-group-flush collapse">
					    <li className="list-group-item bg-light border-0">
    						<div className="text-primary">Description</div>
    						<div className="text-dark Goals__text--sm">{description}</div>
    					</li>
    					<li className="list-group-item bg-white border-0">
    						<div className="text-primary">Plans</div>
    						<div className="Goals__plans text-dark Goals__text--sm">{plans}</div>
    					</li>
  					</ul>
  					</div>
  				</div>
			</div>);
	}
}

export default observer(GoalItem);