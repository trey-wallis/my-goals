import React, {Component} from 'react';

import {observer} from 'mobx-react';

import RootStore from '../store/RootStore';
import ProgressBar from './goal/ProgressBar.js';
import ViewList from '../icons/view-list.svg';
import Plus from '../icons/plus.svg';
import Minus from '../icons/minus.svg';
import AddGoal from '../components/goal/AddGoal';

import $ from 'jquery';
import '../css/Goals.css'

class Goals extends Component {

	constructor(){
		super();
		const {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
	}

	componentDidMount(){
		if (this.domain.visionData.categories.length > 0){
			this.domain.addGoal.form.visionCategory = this.domain.visionData.categories[0].id;
		}
		const items = this.domain.visionData.items.filter(item => {
			return item.categoryid === this.domain.addGoal.form.visionCategory;
		});
		if (items.length > 0){
			this.domain.addGoal.form.visionItem = items[0].id;
		}
		$('.navbar-collapse').collapse('hide');
		this.ui.navItemActive = 2;
		this.ui.dropDown.id = 2;
	}

	increaseProgress = (id) => {
		const goal = this.domain.goalData.filter(goal => goal.id === id)[0];
		if (goal.progresstotal!== 0){
			if (goal.progresscount < goal.progresstotal){
				goal.progresscount += 1;
				this.domain.postProgress(id, goal.progresscount);
			}
		}
	}

	decreaseProgress = (id) => {
		const goal = this.domain.goalData.filter(goal => goal.id === id)[0];
		if (goal.progresstotal!== 0){
			if (goal.progresscount !== 0){
				goal.progresscount -= 1;
				this.domain.postProgress(id, goal.progresscount);
			}
		}
	}

	renderGoals(){
			let visionItemName = "";
			let visionItemURL = "";

			return this.domain.goalData.map((goal, i) => {
				for (let i = 0; i < this.domain.visionData.items.length; i++){
					if (this.domain.visionData.items[i].id === goal.visionid){
						visionItemName = this.domain.visionData.items[i].title;
						visionItemURL = this.domain.visionData.items[i].url;
						break;
					}
				}

				let goalProgress = 0;
				if (goal.progresstotal!== 0){
					goalProgress = parseInt((goal.progresscount / goal.progresstotal) * 100);
				}

				return(
					<div key={i} className="col-12 mb-4">
					<div className="media">
					<div className="Goals__side align-self-center">
					<img className="Goals__img mr-4" src={visionItemURL} alt={visionItemName}/>
						<p className="Goals__vision-text text-center text-primary">{visionItemName}</p>
					</div>
					<div className="media-body">
					<div className="card border-0">
						<div className="card-body">
							<div className="d-flex justify-content-between">
								<div className="wrapper">	
									<h6 className="card-title text-primary">{goal.name}</h6>
								</div>
								<div className="d-flex justify-content-end">
									<div className="Goals__icon">
										<img src={Plus} className="Goals__icon-item" alt="plus" onClick={()=>{this.increaseProgress(goal.id)}}/>
									</div>
									<div className="Goals__icon">
										<img src={Minus} className="Goals__icon-item" alt="minus" onClick={()=>{this.decreaseProgress(goal.id)}}/>
									</div>
									<div className="Goals__icon">
										<img src={ViewList} className="Goals__icon-item" alt="viewlist" data-toggle="collapse" data-target={"#goal-info-" + i}/>
									</div>
								</div>
							</div>
							<div className="row mb-2">
								<div className="col-6 col-md-4 col-lg-2 align-self-end">
									<div className="text-dark">{goal.starttime.substring(0,10)}</div>
								</div>
								<div className="col-6 col-md-4 col-lg-2 align-self-end">
									<div className="text-dark">{goal.endtime.substring(0,10)}</div>
								</div>
								<div className="col-md-4 col-lg-2 align-self-end">
									<div className="text-dark">{goal.progresslabel}</div>
								</div>
								<div className="col-md-4 col-lg-2 align-self-end">
									<div className="text-dark">{`${goal.progresscount} out of ${goal.progresstotal}`}</div>
								</div>
							</div>
							<ProgressBar width={goalProgress} height='15'/>
						</div>
					</div>
					<ul id={"goal-info-" + i} className="list-group list-group-flush collapse">
					    <li className="list-group-item bg-light border-0">
    						<div className="text-primary">Description</div>
    						<div className="text-dark Goals__text--sm">{goal.description}</div>
    					</li>
    					<li className="list-group-item bg-white border-0">
    						<div className="text-primary">Plans</div>
    						<div className="text-dark Goals__text--sm">{goal.plans}</div>
    					</li>
    					<li className="list-group-item bg-light border-0">
    						<div className="text-primary">Subgoals</div>
    						<div className="text-dark Goals__text--sm ">None</div>
    					</li>
    					<li className="list-group-item bg-white border-0">
    						<div className="text-secondary">Tasks</div>
    						<div className="text-dark Goals__text--sm">None</div>
    					</li>
  					</ul>
  					</div>
  					</div>
				</div>);
			});
	}

	renderGoalNotification = () => {
		return(
			<p className="text-center">There are no goals to display<br/>
			Would you like to <span className="text-primary" data-toggle="modal" data-target="#modal-add-goal">add</span> a goal?</p>
		);
	}

	renderCategoryNotification = () => {
		return(
			<p className="text-center">There are no goals to display</p>
		);
	}

	renderBoard = () => {
		if(this.domain.goalData.length > 0){
			return (<div className="row">
				{this.renderGoals()}
			</div>);
		} else {
			return this.renderGoalNotification()
		}
	}

	render(){
		return(
			<div className="Goals">
				<div className="container bg-white">
					<div className="p-4">
						<h3 className="text-center">Goals</h3>
						{this.domain.visionData.items.length > 0 ?
							this.renderBoard() : this.renderCategoryNotification()}
					</div>
				</div>
				<AddGoal />
			</div>);
	}
}

export default observer(Goals);