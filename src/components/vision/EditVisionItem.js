import React, {Component} from 'react';
import {observer} from 'mobx-react';

import Scrollable from '../Scrollable';
import RootStore from '../../store/RootStore';

class EditVisionItem extends Component {

	constructor(){
		super();
		const {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;

		this.domain.editVisionItemForm.categoryId = this.domain.visionCategories[0].id;

		for (let i = 0; i < this.domain.visionItems.length; i++){
			const item = this.domain.visionItems[i];
			if (item.categoryid === this.domain.editVisionItemForm.categoryId){
				this.domain.editVisionItemForm.visionItems.push({
					id: item.id,
					title: item.title,
					description: item.description,
					url: item.url,
				});
			}
		}
	}

	onSaveChanges = () => {
		this.domain.editVisionItem();
	}

	onCategoryChange = (e) => {
		this.domain.editVisionItemForm.categoryId = parseInt(e.target.value);
	}

	renderCategoryOptions = () => {
		return this.domain.visionCategories.map((category, i) => {
			return <option key={i} value={category.id}>{category.name}</option>;
		});
	}

	onItemTitleChange = (i, e) => {
		this.domain.editVisionItemForm.visionItems[i].title = e.target.value;
	}

	onItemDescriptionChange = (i, e) => {
		this.domain.editVisionItemForm.visionItems[i].description = e.target.value;
	}

	onItemUrlChange = (i, e) => {
		this.domain.editVisionItemForm.visionItems[i].url = e.target.value;
	}

	onItemDelete = (i) => {
		const id = this.domain.editVisionItemForm.visionItems[i].id;
		if (this.domain.editVisionItemForm.delete.contains(id)){
			this.domain.editVisionItemForm.delete.push(id);
		}
	}

	renderVisionItems = () => {
		return this.domain.visionItems.map((item, i) => {
				return(
				<div className="mt-2" key={i}>
					<h6>Vision Item {i}</h6>
					<div className="form-group">
						<input type="text" className="form-control" value={this.domain.editVisionItemForm.visionItems[i].title} placeholder="Name" onChange={ (e)=> {this.onItemTitleChange(i, e)} }/>
					</div>
					<div className="form-group">
						<textarea className="form-control" value={this.domain.editVisionItemForm.visionItems[i].description} placeholder="Explain what your vision looks like. What do you want to accomplish?" onChange={ (e)=> {this.onItemDescriptionChange(i, e)} }></textarea>
					</div>
					<div className="form-group">
						<input type="text" className="form-control" value={this.domain.editVisionItemForm.visionItems[i].url} placeholder="URL" onChange={ (e)=> {this.onItemUrlChange(i, e)} }/>
					</div>
					<div className="d-flex w-100 justify-content-end">
						<button className="btn btn-danger" onClick={() => {this.onItemDelete(i)}}>Delete</button>
					</div>
				</div>);
		});
	}

	render(){
		return(
			<div className="modal fade" id="modal-edit-vision-item" role="dialog">
				<div className="modal-dialog" role="document">
			    	<div className="modal-content">
			    		<div className="modal-header">
			    			<h5 className="modal-title">Edit Vision Item</h5>
			    			<button type="button" className="close" data-dismiss="modal">
			          			<span>&times;</span>
			       			</button>
			      		</div>
			      		<div className="modal-body">
			      			<h6>Category</h6>
				      		<select className="form-control form-control-sm mb-2" onChange={(e) => {this.onCategoryChange(e)}}>
				      			{this.renderCategoryOptions()}
							</select>
							<Scrollable height="255px">
								{this.renderVisionItems()}
							</Scrollable>
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

export default observer(EditVisionItem);