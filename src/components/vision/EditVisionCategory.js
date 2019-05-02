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
		this.domain.editCategoryForm.name = this.domain.visionCategoryName();
	}

	onCategoryDelete = () => {
		if (this.domain.editCategoryForm.deleteId === -1){
			this.domain.editCategoryForm.deleteId = this.domain.editCategoryForm.id;
			this.domain.editCategoryForm.response = "Queued for deletion";
		} else {
			this.domain.editCategoryForm.deleteId = -1;
			this.domain.editCategoryForm.response = "";
		}
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
				    <select className="form-control form-control-sm mb-2" onChange={(e) => {this.onCategoryChange(e)}}>
				    			{this.renderCategoryOptions()}
					</select>
				</div>
				<h6 className="text-black">Category</h6>
			    <div className="form-group mb-3">
			      <div className="row">
			      	<div className="col-8">
						<input type="text" className="form-control" placeholder="Name" value={this.domain.editCategoryForm.name} onChange={ (e) => {this.onCategoryNameChange(e)}}/>
			      		</div>
	      					<div className="col-2">
			      			<button className="btn btn-danger" onClick={this.onCategoryDelete}>Delete</button>
			      		</div>
			      		</div>
			      	</div>
			      	<button type="button" className="btn btn-primary mb-2" onClick={this.onSaveChanges}>Save changes</button>
			     	<div className="text-danger">{this.domain.editCategoryForm.response}</div>
			</Modal>
		);
	}
}

export default observer(EditVisionCategory);