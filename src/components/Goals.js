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
		if (this.domain.visionCategories.length > 0){
			this.domain.addGoalCategoryId = this.domain.visionCategories[0].id;
		}
		const items = this.domain.visionItems.filter(item => {
			return item.categoryid === this.domain.addGoalCategoryId;
		});
		if (items.length > 0){
			this.domain.addGoalVisionItemId = items[0].id;
		}
		$('.navbar-collapse').collapse('hide');
		this.ui.navItemActive = 2;
		this.ui.dropDown.id = 2;
	}

	increaseProgress = (id) => {
		const goal = this.domain.goals.filter(goal => goal.id === id)[0];
		const progress = goal.progress;
		if (progress === 100)
			return;
		this.domain.progress(id, progress + 10);
	}

	decreaseProgress = (id) => {
		const goal = this.domain.goals.filter(goal => goal.id === id)[0];
		const progress = goal.progress;
		if (progress === 0)
			return;
		this.domain.progress(id, progress - 10);
	}

	renderGoals(){
			let visionItemName = "";
			let visionItemURL = "";

			return this.domain.goals.map((goal, i) => {
				for (let i = 0; i < this.domain.visionItems.length; i++){
					if (this.domain.visionItems[i].id === goal.visionid){
						visionItemName = this.domain.visionItems[i].title;
						visionItemURL = this.domain.visionItems[i].url;
						break;
					}
				}

				return(
					<div key={i} className="col-12 mb-4">
					<div className="media">
					<img className="Goals__img align-self-center mr-4" src={visionItemURL} alt={visionItemName}/>
					<div className="media-body">
					<div className="card bg-primary">
						<div className="card-body">
							<div className="d-flex justify-content-between">
								<div className="wrapper">	
									<h6 className="card-title text-white">{goal.name}</h6>
									<div className="text-light">{visionItemName}</div>
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
								<div className="col-4 col-lg-2 align-self-end">
									<div className="text-light">{goal.starttime.substring(0,10)}</div>
								</div>
								<div className="col-4 col-lg-2 align-self-end">
									<div className="text-light">{goal.endtime.substring(0,10)}</div>
								</div>
								<div className="col-4 col-lg-2 align-self-end">
									<div className="text-light">{goal.progress}%</div>
								</div>
							</div>
							<ProgressBar width={goal.progress} height='5'/>
						</div>
					</div>
					<ul id={"goal-info-" + i} className="list-group list-group-flush collapse">
					    <li className="list-group-item bg-tertiary">
    						<div className="text-secondary">Description</div>
    						<div className="text-secondary Goals__text--sm">{goal.description}</div>
    					</li>
    					<li className="list-group-item bg-tertiary">
    						<div className="text-secondary">Plans</div>
    						<div className="text-secondary Goals__text--sm">{goal.plans}</div>
    					</li>
    					<li className="list-group-item bg-tertiary">
    						<div className="text-secondary">Subgoals</div>
    						<div className="text-secondary Goals__text--sm ">None</div>
    					</li>
    					<li className="list-group-item bg-tertiary">
    						<div className="text-secondary">Tasks</div>
    						<div className="text-secondary Goals__text--sm">None</div>
    					</li>
  					</ul>
  					</div>
  					</div>
				</div>);
			});
	}

	renderMessage = () => {
		return(
			<p className="text-center">There are no goals to display<br/>
			Would you like to <span className="text-primary" data-toggle="modal" data-target="#modal-add-goal">add</span> a goal?</p>
		);
	}

	render(){
		return(
			<div className="Goals">
				<div className="container bg-white">
					<div className="p-4">
						<h3 className="text-center">Goals</h3>
						{this.domain.goals.length > 0 ? 
							<div className="row">
								{this.renderGoals()}
							</div> : this.renderMessage()}
					</div>
				</div>
				<AddGoal />
			</div>);
	}
}

export default observer(Goals);