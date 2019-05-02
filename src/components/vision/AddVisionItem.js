import React, {Component} from 'react';
import {observer} from 'mobx-react';

import RootStore from '../../store/RootStore';

import Modal from '../Modal';

class AddVisionItem extends Component {

	constructor(){
		super();
		const {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
	}

	onNameChange = (e) => {
		this.domain.addVisionItemForm.name = e.target.value;
	}

	onDescriptionChange = (e) => {
		this.domain.addVisionItemForm.description = e.target.value;
	}

	onUrlChange = (e) => {
		this.domain.addVisionItemForm.url = e.target.value;
	}

	onCategoryChange = (e) => {
		this.domain.addVisionItemForm.categoryId = e.target.value;
	}


	onAdd = () => {
		this.domain.postAddVisionItem();
	}

	renderCategories(){
		return this.domain.visionData.categories.map((category, i) => {
			return <option key={i} value={category.id}>{category.name}</option>;
		});
	}

	render(){
		return(
			<Modal id="modal-add-vision-item" title="Add Vision Item">
				<h6 className="text-black">Category</h6>
			    <div className="form-group">
			     	<select className="form-control form-control-sm mb-2" onChange={ (e)=> { this.onCategoryChange(e)} }>
			      		{this.renderCategories()}
					</select>
			    </div>
			    <h6 className="text-black">Vision Item</h6>
				<div className="form-group">
					<input type="text" className="form-control" value={this.domain.addVisionItemForm.name} placeholder="Name" onChange={ (e)=> {this.onNameChange(e)} }/>
				</div>
				<div className="form-group">
					<textarea className="form-control" value={this.domain.addVisionItemForm.description} placeholder="Explain what your vision looks like. What do you want to accomplish?" onChange={ (e)=> {this.onDescriptionChange(e)} }></textarea>
				</div>
				<div className="form-group">
					<input type="text" className="form-control" value={this.domain.addVisionItemForm.url} placeholder="URL" onChange={ (e)=> {this.onUrlChange(e)} }/>
				</div>
				<button type="button" className="btn btn-primary mb-2" onClick={this.onAdd}>Add Vision Item</button>
				<div className="text-danger">{this.domain.addVisionItemForm.response}</div>
			</Modal>
		);
	}
}

export default observer(AddVisionItem);