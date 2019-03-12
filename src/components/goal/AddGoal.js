import React, {Component} from 'react';
import {observer} from 'mobx-react';

import RootStore from '../../store/RootStore';
import Scrollable from '../Scrollable';

class AddGoal extends Component {

	constructor(){
		super();
		const {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
	}

	onVisionItemChange = (e) => {
		this.domain.addGoalForm.visionItemId = parseInt(e.target.value); //we need to parse int because select values are strings

		this.domain.visionData.items.forEach(item => {
			if(item.id  === this.domain.addGoalForm.visionItemId){
				this.domain.addGoalForm.note = item.notes;
			}
		});
	}

	onCategoryChange = (e) => {
		this.domain.addGoalForm.categoryId = parseInt(e.target.value);

		for (let i = 0; i < this.domain.visionData.items.length; i++){
			const item = this.domain.visionData.items[i];
			if (item.categoryid === this.domain.addGoalForm.categoryId){
				this.domain.addGoalForm.visionItemId = item.id;
				this.domain.addGoalForm.note = item.notes;
				break;
			}
		}
	}

	onNameChange = (e) => {
		this.domain.addGoalForm.name = e.target.value;
	}

	onDescriptionChange = (e) => {
		this.domain.addGoalForm.description = e.target.value;
	}

	onStartChange = (e) => {
		this.domain.addGoalForm.start = e.target.value;
	}

	onEndChange = (e) => {
		this.domain.addGoalForm.end = e.target.value;
	}

	onAddGoal = () => {
		this.domain.postAddGoal();
	}

	onPlansChange = (e) => {
		this.domain.addGoalForm.plans = e.target.value;
	}

	renderCategories(){
		return this.domain.visionData.categories.map((category, i) => {
			return <option key={i} value={category.id}>{category.name}</option>;
		});
	}

	renderVisionItems(){
		return this.domain.visionData.items.map((item,i) => {
			if (item.categoryid === this.domain.addGoalForm.categoryId){
				return <option key={i} value={item.id}>{item.title}</option>;
			}
			return '';
		});
	}

	renderForm(){
		return(<Scrollable height="220px">
					<h6>Category</h6>
			      	<div className="form-group">
			      		<select className="form-control form-control-sm mb-2" onChange={this.onCategoryChange}>
			      			{this.renderCategories()}
						</select>
			    	</div>
			   		<h6>Vision Item</h6>
		  			<div className="form-group">
			 			<select className="form-control form-control-sm mb-2" onChange={this.onVisionItemChange}>
	     					{this.renderVisionItems()}
						</select>
		     		</div>
		     		<h6>Goal</h6>
					<div className="form-group">
						<input type="text" className="form-control form-control-sm" placeholder="Name" onChange={this.onNameChange}/>
					</div>
					<div className="form-group">
						<textarea className="form-control form-control-sm" placeholder="What do you want to do? How will this help you progress towards your vision?" onChange={this.onDescriptionChange}/>
					</div>
					<div className="form-group">
						<textarea className="form-control form-control-sm" rows="4" placeholder="What are your plans to achieve your goal?" onChange={this.onPlansChange}/>
					</div>
					<div className="form-group">
						<label>Start</label>
						<input type="date" className="form-control form-control-sm" onChange={this.onStartChange}/>
					</div>
					<div className="form-group">
						<label>End</label>
						<input type="date" className="form-control form-control-sm" onChange={this.onEndChange}/>
					</div>
				</Scrollable>);
	}

	render(){
		return(
			<div className="modal fade" id="modal-add-goal" role="dialog">
				<div className="modal-dialog" role="document">
			    	<div className="modal-content">
			    		<div className="modal-header">
			    			<h5 className="modal-title">Add Goal</h5>
			    			<button type="button" className="close" data-dismiss="modal">
			          			<span>&times;</span>
			       			</button>
			      		</div>
			      		<div className="modal-body">
			      			{this.renderForm()}
			      			<div className="form-group mt-2">
			      				<textarea className="form-control collapse" id="add-goal-text-notes" rows="5" placeholder="Ideas, goals, or plans about your vision item" value={this.domain.addGoalForm.note} readOnly />
			      			</div>
			      		</div>
			      		<div className="modal-footer justify-content-between">
			      			<div className="text-danger">{this.domain.addGoalForm.response}</div>
			      			<div className="button__wrapper">
			      				<button type="button" className="btn btn-success mr-2" data-toggle="collapse" data-target="#add-goal-text-notes">View Note</button>
				      			<button type="button" className="btn btn-primary mr-2" onClick={this.onAddGoal}>Add Goal</button>
				        		<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
			        		</div>
			      		</div>
			    	</div>
			  	</div>
			</div>);
	}
}

export default observer(AddGoal);