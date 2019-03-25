import React, {Component} from 'react';
import {observer} from 'mobx-react';

import $ from 'jquery';
import RootStore from '../../store/RootStore';

class editGoal extends Component {

	constructor(){
		super();
		const {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
	}

	/*
	* On Change Handlers
	*/
	onItemChange = (e) => {
		this.domain.editGoal.form.visionItem = parseInt(e.target.value); //we need to parse int because select values are strings

		const item = this.domain.visionData.items.filter(item => item.id === this.domain.editGoal.form.visionItem)[0];
		this.domain.editGoal.visionNote = item.notes;
	}

	onCategoryChange = (e) => {
		this.domain.editGoal.form.visionCategory = parseInt(e.target.value);

		const item = this.domain.visionData.items.filter(item => item.categoryid === this.domain.editGoal.form.visionCategory)[0];
		this.domain.editGoal.form.visionItem = item.id;
		this.domain.editGoal.visionNote = item.notes;
	}

	onNameChange = (e) => {
		this.domain.editGoal.form.name = e.target.value;
	}

	onDescriptionChange = (e) => {
		this.domain.editGoal.form.description = e.target.value;
	}

	onStartChange = (e) => {
		this.domain.editGoal.form.start = e.target.value;
	}

	onEndChange = (e) => {
		this.domain.editGoal.form.end = e.target.value;
	}

	onPlansChange = (e) => {
		this.domain.editGoal.form.plans = e.target.value;
	}

	onProgressTotalChange = (e) => {
		this.domain.editGoal.form.progressTotal = e.target.value;
	}

	onProgressLabelChange = (e) => {
		this.domain.editGoal.form.progressLabel = e.target.value;
	}

	/*
	* On Click Handlers
	*/
	onMenuForwardClick = () => {
		if(this.domain.editGoal.menu === 4){
			this.domain.postEditGoal();
		} else {
			this.domain.editGoal.menu++;	
		}
	}

	onMenuBackClick = () => {
		this.domain.editGoal.menu--;
	}

	onDismiss = () => {
		this.domain.editGoal.menu = 0;
		this.domain.editGoal.response = "";
		$("#modal-edit-goal").modal('hide');

	}

	/*
	* Render Methods
	*/
	renderCategories(){
		return this.domain.visionData.categories.map((category, i) => {
			return <option key={i} value={category.id}>{category.name}</option>;
		});
	}

	renderItems(){
		return this.domain.visionData.items.map((item,i) => {
			if (item.categoryid === this.domain.editGoal.form.visionCategory)
				return <option key={i} value={item.id}>{item.title}</option>;
			return '';
		});
	}

	renderMenu = () => {
		switch(this.domain.editGoal.menu){
			case 1:
				return this.renderSelectVisionItem();
			case 2:
				return this.renderGoalDescription();
			case 3:
				return this.renderSelectDate();
			case 4:
				return this.renderTrackProgress();
			default:
				return this.renderSelectCategory();
		}
	}

	renderSelectCategory = () => {
		return (
				<React.Fragment>
					<h6>Select a category</h6>
					<div className="form-group">
						<select className="form-control form-control-sm mb-2" onChange={this.onCategoryChange} value={this.domain.editGoal.form.visionCategory}>
							{this.renderCategories()}
						</select>
					</div>
				</React.Fragment>
				);
	}

	renderSelectVisionItem = () => {
		return (
				<React.Fragment>
					<h6>Select an item</h6>
					<div className="form-group">
						<select className="form-control form-control-sm mb-2" onChange={this.onItemChange} value={this.domain.editGoal.form.visionItem}>
							{this.renderItems()}
						</select>
					</div>
				</React.Fragment>
				);
	}

	renderGoalDescription = () => {
		return(
				<React.Fragment>
		     		<h6>Enter goal details</h6>
					<div className="form-group">
						<input type="text" className="form-control form-control-sm" placeholder="Name" onChange={this.onNameChange} value={this.domain.editGoal.form.name}/>
					</div>
					<div className="form-group">
						<textarea className="form-control form-control-sm" placeholder="What do you want to do? How will this help you progress towards your vision?" onChange={this.onDescriptionChange} value={this.domain.editGoal.form.description}/>
					</div>
					<div className="form-group">
						<textarea className="form-control form-control-sm" rows="4" placeholder="What are your plans to achieve your goal?" onChange={this.onPlansChange} value={this.domain.editGoal.form.plans}/>
					</div>
				</React.Fragment>
				);
	}

	renderSelectDate = () => {
		return(
				<React.Fragment>
					<h6>Goal timeline</h6>
					<div className="form-group">
						<label>Start</label>
						<input id="start-date" type="date" className="form-control form-control-sm" onChange={this.onStartChange} value={this.domain.editGoal.form.start}/>
					</div>
					<div className="form-group">
						<label>End</label>
						<input id="end-date" type="date" className="form-control form-control-sm" onChange={this.onEndChange} value={this.domain.editGoal.form.end}/>
					</div>
				</React.Fragment>
				);
	}

	renderTrackProgress =  () => {
		return(
			<React.Fragment>
				<h6>Tracking progress</h6>
				<div className="form-group">
					<input type="text" className="form-control form-control-sm" placeholder="Progress label" onChange={this.onProgressLabelChange} value={this.domain.editGoal.form.progressLabel}/>
				</div>
				<div className="form-group">
					<input type="number" className="form-control form-control-sm" placeholder="Number of tasks" onChange={this.onProgressTotalChange} value={this.domain.editGoal.form.progressTotal}/>
				</div>
			</React.Fragment>
			);
	}

	render(){
		return(
		<div className="modal fade" id="modal-edit-goal" role="dialog">
			<div className="modal-dialog" role="document">
		    	<div className="modal-content">
		    		<div className="modal-header">
			    		<button type="button" className="btn btn--reset" onClick={this.onDismiss}>
			          		<span>&times;</span>
			       		</button>
			       		<div>
			       		{this.domain.editGoal.menu > 0 ? <button type="button" className="btn btn--reset" onClick={this.onMenuBackClick}>Back</button> : ''}
			       		<button type="button" className="btn btn--reset" onClick={this.onMenuForwardClick}>{this.domain.editGoalMenuOption}</button>
			       		</div>
			      	</div>
			      	<div className="modal-body">
		    			{this.renderMenu()}
		    			{this.domain.editGoal.menu > 0 ?
		    			<div className="form-group mt-2">
	 		      			<textarea className="form-control collapse" id="edit-goal-text-notes" rows="5" placeholder="Ideas, goals, or plans about your vision item" value={this.domain.editGoal.visionNote} readOnly />
	 		      		</div> : ''}
		    		</div>
		    		<div className="modal-footer justify-content-between">
		    			<div className="text-danger">{this.domain.editGoal.response}</div>
		    			{this.domain.editGoal.menu > 0 ?
		    			<button type="button" className="btn btn-sm btn-success" data-toggle="collapse" data-target="#edit-goal-text-notes">View Notes</button> : <div></div>}
		    		</div>
		    	</div>
		  	</div>
		</div>);
	}
}

export default observer(editGoal);