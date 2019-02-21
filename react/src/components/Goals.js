import React, {Component} from 'react';

import {observer} from 'mobx-react';

import RootStore from '../store/RootStore';
import ProgressBar from './goal/ProgressBar.js';
import ViewList from '../icons/view-list.svg';

import '../css/Goals.css'

class Goals extends Component {

	constructor(){
		super();
		const {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
	}

	renderGoals(){
		if (this.domain.goals.length > 0){
			return this.domain.goals.map((goal, i) => {
				let visionItemName =  "";
				for (let i = 0; i < this.domain.visionItems.length; i++){
					if (this.domain.visionItems[i].id === goal.visionid){
						visionItemName = this.domain.visionItems[i].title;
						break;
					}
				}

				return(
					<div key={i} className="col-sm-6 mb-3">
					<div className="card">
						<div className="card-body">
							<div className="d-flex justify-content-between">
								<div className="wrapper">	
									<h5 className="card-title">{goal.name}</h5>
									<p className="Goals__text--lg">{visionItemName}</p>
								</div>
								<div className="Goals__icon">
									<img src={ViewList} className="Goals__icon-item" alt="viewlist" data-toggle="collapse" data-target={"#goal-info-" + i}/>
								</div>
							</div>
							<div className="row mb-2">
								<div className="col-4 align-self-end">
									<p className="Goals__text Goals__text--lg">{goal.starttime.substring(0,10)}</p>
									<p className="Goals__text Goals__text--sm ">Start</p>
								</div>
								<div className="col-4 align-self-end">
									<p className="Goals__text Goals__text--lg">{goal.endtime.substring(0,10)}</p>
									<p className="Goals__text Goals__text--sm">End</p>
								</div>
								<div className="col-4 align-self-end">
									<p className="Goals__text Goals__text--lg">{goal.progress}%</p>
									<p className="Goals__text Goals__text--sm">Progress</p>
								</div>
							</div>
							<ProgressBar width={goal.progress} height='5'/>
						</div>
					</div>
					<ul id={"goal-info-" + i} className="list-group list-group-flush collapse">
					    <li className="list-group-item">
    						<p className="Goals__text Goal__text--lg">Description</p>
    						<p className="Goals__text Goals__text--sm">{goal.description}</p>
    					</li>
    					<li className="list-group-item">
    						<p className="Goals__text Goal__text--lg">Plans</p>
    						<p className="Goals__text Goals__text--sm">{goal.plans}</p>
    					</li>
    					<li className="list-group-item">
    						<p className="Goals__text Goal__text--lg">Subgoals</p>
    						<p className="Goals__text Goals__text--sm ">None</p>
    					</li>
    					<li className="list-group-item">
    						<p className="Goals__text Goal__text--lg">Tasks</p>
    						<p className="Goals__text Goals__text--sm">None</p>
    					</li>
  					</ul>
				</div>);
			});
		} else {
			return (
				<div className="text-center col-12">
					<p>There are no goals to display<br/>
					Would you like to <span className="text-danger" data-toggle="modal" data-target="#modal-add-goal">add</span> a goal?</p>
				</div>);
		}
	}

	render(){
		return(
			<div className="menu">
				<div className="container h-100">
					<h3 className="my-5 text-center">Goals</h3>
					<div className="row">
						{this.renderGoals()}
					</div>
				</div>
			</div>);
	}
}

export default observer(Goals);