import React, {Component} from 'react';

import {observer} from 'mobx-react';

import RootStore from '../store/RootStore';
import ProgressBar from './goal/ProgressBar.js';
import ViewList from '../icons/view-list.svg';
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
		this.ui.changeDropDownMenu("goals", "My Goals");
		
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
	}

	renderGoals(){
			return this.domain.goals.map((goal, i) => {
				let visionItemName =  "";
				for (let i = 0; i < this.domain.visionItems.length; i++){
					if (this.domain.visionItems[i].id === goal.visionid){
						visionItemName = this.domain.visionItems[i].title;
						break;
					}
				}

				return(
					<div key={i} className="col-12 mb-4">
					<div className="media">
					<img className="Goals__img" src="https://via.placeholder.com/64x64" alt="test"/>
					<div className="media-body">
					<div className="card bg-primary">
						<div className="card-body">
							<div className="d-flex justify-content-between">
								<div className="wrapper">	
									<h6 className="card-title text-white">{goal.name}</h6>
									<div className="text-light">{visionItemName}</div>
								</div>
								<div className="Goals__icon">
									<img src={ViewList} className="Goals__icon-item" alt="viewlist" data-toggle="collapse" data-target={"#goal-info-" + i}/>
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
						{this.domain.goals.length > 0 ? this.renderGoals() : this.renderMessage()}
						<div className="row">
							{this.renderGoals()}
						</div>
					</div>
				</div>
				<AddGoal />
			</div>);
	}
}

export default observer(Goals);