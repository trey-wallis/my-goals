import React, {Component} from 'react';
import {observer} from 'mobx-react';

import Scrollable from '../Scrollable';
import RootStore from '../../store/RootStore';

class EditVisionCategory extends Component {

	constructor(){
		super();
		const {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;

		this.domain.editCategoryForm.id = this.domain.visionCategories[0].id;
		this.domain.editCategoryForm.name = this.domain.visionCategories[0].name;
	}

	onCategoryNameChange = (e) => {
		this.domain.editCategoryForm.name = e.target.value; 
	}

	onSaveChanges = () => {
		this.domain.editVisionCategory();
	}

	onCategoryChange = (e) => {
		this.domain.editCategoryForm.id = parseInt(e.target.value);
		this.domain.editCategoryForm.name = this.domain.visionCategoryName(parseInt(e.target.value));
	}

	onCategoryDelete = () => {
		this.domain.editCategoryForm.delete = this.domain.editCategoryForm.id;
	}

	renderCategoryOptions = () => {
		return this.domain.visionCategories.map((category, i) => {
			return <option key={i} value={category.id}>{category.name}</option>;
		});
	}

	render(){
		return(
			<div className="modal fade" id="modal-edit-vision-category" role="dialog">
				<div className="modal-dialog" role="document">
			    	<div className="modal-content">
			    		<div className="modal-header">
			    			<h5 className="modal-title">Edit Category</h5>
			    			<button type="button" className="close" data-dismiss="modal">
			          			<span>&times;</span>
			       			</button>
			      		</div>
			      		<div className="modal-body">
				      		<select className="form-control form-control-sm mb-2" onChange={(e) => {this.onCategoryChange(e)}}>
				      			{this.renderCategoryOptions()}
							</select>
							<h6 className="mt-2">Category</h6>
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
			      		</div>
			      		<div className="modal-footer justify-content-between">
			      			<div className="text-danger">{this.domain.editCategoryForm.response}</div>
			      			<div>
				      			<button type="button" className="btn btn-primary mr-2" onClick={this.onSaveChanges}>Save changes</button>
				        		<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
			        		</div>
			      		</div>
			    	</div>
			  	</div>
			</div>);
	}
}

export default observer(EditVisionCategory);