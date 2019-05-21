import React, {Component} from 'react';
import {observer} from 'mobx-react';

import $ from 'jquery';
import RootStore from '../../store/RootStore';
import {date} from '../../TextUtils';

class AddGoal extends Component {

	constructor(){
		super();
		const {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
	}

	componentDidMount(){
		//If there are more than 0 categories then set the first category as the default
		//option in the form
		if (this.domain.visionData.categories.length > 0){
			this.domain.addGoal.form.visionCategory = this.domain.visionData.categories[0].id;
		}

		//Filter all vision items that fall within this category
		const items = this.domain.visionData.items.filter(item => {
			return item.categoryid === this.domain.addGoal.form.visionCategory;
		});

		//If the number of items in that category are not 0 then set the default vision item to be the first
		if (items.length > 0){
			this.domain.addGoal.form.visionItem = items[0].id;
		}

		this.domain.addGoal.form.start = date(0);
		this.domain.addGoal.form.end = date(7);
	}

	/*
	* On Change Handlers
	*/
	onItemChange = (e) => {
		this.domain.addGoal.form.visionItem = parseInt(e.target.value); //we need to parse int because select values are strings
	}

	onCategoryChange = (e) => {
		this.domain.addGoal.form.visionCategory = parseInt(e.target.value);

		for (let i = 0; i < this.domain.visionData.items.length; i++){
			const item = this.domain.visionData.items[i];
			if (item.categoryid === this.domain.addGoal.form.visionCategory){
				this.domain.addGoal.form.visionItem = item.id;
				break;
			}
		}
	}

	onNameChange = (e) => {
		this.domain.addGoal.form.name = e.target.value;
	}

	onDescriptionChange = (e) => {
		this.domain.addGoal.form.description = e.target.value;
	}

	onStartChange = (e) => {
		this.domain.addGoal.form.start = e.target.value;
	}

	onEndChange = (e) => {
		this.domain.addGoal.form.end = e.target.value;
	}

	onAddGoal = () => {
		this.domain.postAddGoal();
	}

	onPlansChange = (e) => {
		this.domain.addGoal.form.plans = e.target.value;
	}

	onProgressTotalChange = (e) => {
		this.domain.addGoal.form.progressTotal = e.target.value;
	}

	onProgressTrackingChange = (e) => {
		this.domain.addGoal.form.progressTracking = parseInt(e.target.value);
	}

	/*
	* On Click Handlers
	*/
	onMenuForwardClick = () => {
		if(this.domain.addGoal.menu === 4){
			this.domain.postAddGoal();
		} else {
			this.domain.addGoal.menu++;	
		}
	}

	onMenuBackClick = () => {
		this.domain.addGoal.menu--;
	}

	onDismiss = () => {
		this.domain.addGoal.menu = 0;
		this.domain.addGoal.response = "";
		$("#modal-add-goal").modal('hide');

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
			if (item.categoryid === this.domain.addGoal.form.visionCategory)
				return <option key={i} value={item.id}>{item.title}</option>;
			return '';
		});
	}

	renderMenu = () => {
		switch(this.domain.addGoal.menu){
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
				<h6 className="text-black">Select a category</h6>
				<div className="form-group">
					<select className="form-control form-control-sm" value={this.domain.addGoal.form.visionCategory} onChange={this.onCategoryChange}>
						{this.renderCategories()}
					</select>
				</div>
			</React.Fragment>
		);
	}

	renderSelectVisionItem = () => {
		return (
			<React.Fragment>
				<h6 className="text-black">Select an item</h6>
				<div className="form-group">
					<select className="form-control form-control-sm" value={this.domain.addGoal.form.visionItem} onChange={this.onItemChange}>
						{this.renderItems()}
					</select>
				</div>
			</React.Fragment>
		);
	}

	renderGoalDescription = () => {
		return(
			<React.Fragment>
		    	<h6 className="text-black">Enter goal details</h6>
				<div className="form-group">
					<input type="text" className="form-control form-control-sm" placeholder="Name" value={this.domain.addGoal.form.name} onChange={this.onNameChange}/>
				</div>
				<div className="form-group">
					<textarea className="form-control form-control-sm" placeholder="What do you want to do? How will this help you progress towards your vision?" value={this.domain.addGoal.form.description} onChange={this.onDescriptionChange}/>
				</div>
				<div className="form-group">
					<textarea className="form-control form-control-sm" rows="4" placeholder="What are your plans to achieve your goal? What will hinder me in my progress? What are my plans to overcome this?" value={this.domain.addGoal.form.plans} onChange={this.onPlansChange}/>
				</div>
			</React.Fragment>
		);
	}

	renderSelectDate = () => {
		return(
			<React.Fragment>
				<h6 className="text-black">Goal timeline</h6>
				<div className="form-group">
					<label className="text-black">Start</label>
					<input id="start-date" type="date" className="form-control form-control-sm" defaultValue={date(0)} onChange={this.onStartChange}/>
				</div>
				<div className="form-group">
					<label className="text-black">End</label>
					<input id="end-date" type="date" className="form-control form-control-sm" defaultValue={date(7)} onChange={this.onEndChange}/>
				</div>
			</React.Fragment>
		);
	}

	renderTrackProgress =  () => {
		let placeholder = "Number of days";
		if (this.domain.addGoal.form.progressTracking === 1){
			placeholder = "Number of tasks";
		}

		return(
			<React.Fragment>
				<h6 className="text-black">Tracking progress</h6>
				<div className="form-group">
					<select className="form-control form-control-sm" value={this.domain.addGoal.form.progressTracking} onChange={this.onProgressTrackingChange}>
						<option value="0">Habit</option>
						<option value="1">Tasks</option>
					</select>
				</div>
				<div className="form-group">
					<input type="number" className="form-control form-control-sm" placeholder={placeholder} value={this.domain.addGoal.form.progressTotal} onChange={this.onProgressTotalChange}/>
				</div>
			</React.Fragment>
		);
	}

	render(){
		return(
		<div className="modal fade" id="modal-add-goal" role="dialog">
			<div className="modal-dialog" role="document">
		    	<div className="modal-content">
		    		<div className="modal-header justify-content-end">
		    			<div className="button-group">
		    				{this.domain.addGoal.menu > 0 ? <button type="button" className="btn btn-danger" onClick={this.onMenuBackClick}>Back</button> : ''}
		    				<button type="button" className="btn btn-success" onClick={this.onMenuForwardClick}>{this.domain.addGoalMenuOption}</button>
			       		</div>
			      	</div>
			      	<div className="modal-body">
		    			{this.renderMenu()}
		    		</div>
		    		<div className="modal-footer">
		    			<div className="text-danger">{this.domain.addGoal.response}</div>
		    		</div>
		    	</div>
		  	</div>
		</div>);
	}
}

export default observer(AddGoal);