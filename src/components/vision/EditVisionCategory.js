import React, {Component} from 'react';
import {observer} from 'mobx-react';

import RootStore from '../../store/RootStore';

import Modal from '../Modal';

class EditVisionCategory extends Component {

	constructor(){
		super();
		const {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;

		if (this.domain.visionData.categories.length > 0){
			this.domain.editCategoryForm.id = this.domain.visionData.categories[0].id;
			this.domain.editCategoryForm.name = this.domain.visionData.categories[0].name;
		}
	}

	onCategoryNameChange = (e) => {
		this.domain.editCategoryForm.name = e.target.value; 
	}

	onSaveChanges = () => {
		this.domain.editVisionCategory();
	}

	onCategoryChange = (e) => {
		this.domain.editCategoryForm.id = parseInt(e.target.value);
		const name = this.domain.visionData.categories.filter(category => category.id === this.domain.editCategoryForm.id)[0].name;
		this.domain.editCategoryForm.name = name;
	}

	renderCategoryOptions = () => {
		return this.domain.visionData.categories.map((category, i) => {
			return <option key={i} value={category.id}>{category.name}</option>;
		});
	}

	render(){
		return(
			<Modal id="modal-edit-vision-category" title="Edit Vision Category">
				<div className="form-group">
				    <select className="form-control form-control-sm" onChange={(e) => {this.onCategoryChange(e)}}>
				    	{this.renderCategoryOptions()}
					</select>
				</div>
				<h6 className="text-black">Category</h6>
			    <div className="form-group mb-3">
					<input type="text" className="form-control" placeholder="Name" value={this.domain.editCategoryForm.name} onChange={ (e) => {this.onCategoryNameChange(e)}}/>
			    </div>
			    <button type="button" className="btn btn-primary mb-2" onClick={this.onSaveChanges}>Save changes</button>
			    <div className="text-danger">{this.domain.editCategoryForm.response}</div>
			</Modal>
		);
	}
}

export default observer(EditVisionCategory);