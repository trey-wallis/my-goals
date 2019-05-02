import React, {Component} from 'react';
import {observer} from 'mobx-react';

import RootStore from '../../store/RootStore';

import Modal from '../Modal';

class EditVisionItem extends Component {

	constructor(){
		super();
		const {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;

		this.domain.editVisionItemForm.visionItems = [];

		if (this.domain.visionData.items.length > 0){
			this.domain.editVisionItemForm.categoryId = this.domain.visionData.categories[0].id;
			this.domain.visionData.items.forEach(item => {
				this.domain.editVisionItemForm.visionItems.push({
						id: item.id,
						title: item.title,
						description: item.description,
						url: item.url,
						category: item.categoryid,
						categorySelectedId: item.categoryid,
				})
			});
		}
	}

	onSaveChanges = () => {
		this.domain.editVisionItem();
	}

	onCategoryChange = (e) => {
		this.domain.editVisionItemForm.categoryId = parseInt(e.target.value);
	}

	onItemChange = (e) => {
		this.domain.editVisionItemForm.itemIndex = parseInt(e.target.value);
	}

	renderCategoryOptions = () => {
		return this.domain.visionData.categories.map((category, i) => {
			return <option key={i} value={category.id}>{category.name}</option>;
		});
	}

	renderItemOptions = () => {
		return this.domain.editVisionItemForm.visionItems.map((item, i) => {
			if(item.category === this.domain.editVisionItemForm.categoryId)
				return <option key={i} value={i}>{item.title}</option>;
			return ''; 
		});
	}

	onItemTitleChange = (e) => {
		this.domain.editVisionItemForm.visionItems[this.domain.editVisionItemForm.itemIndex].title = e.target.value;
	}

	onItemDescriptionChange = (e) => {
		this.domain.editVisionItemForm.visionItems[this.domain.editVisionItemForm.itemIndex].description = e.target.value;
	}

	onItemUrlChange = (e) => {
		this.domain.editVisionItemForm.visionItems[this.domain.editVisionItemForm.itemIndex].url = e.target.value;
	}

	onCategorySelect = (e) => {
		this.domain.editVisionItemForm.visionItems[this.domain.editVisionItemForm.itemIndex].newCategory = e.target.value;
	}

	render(){
		return(
			<Modal id="modal-edit-vision-item" title="Edit Vision Item">
			    <h6 className="text-black">Category</h6>
				<div className="form-group">
				     <select className="form-control form-control-sm mb-2" onChange={(e) => {this.onCategoryChange(e)}}>
				      			{this.renderCategoryOptions()}
							</select>
				</div>
				<h6 className="text-black">Vision Item</h6>
				<div className="form-group">
					<select className="form-control form-control-sm mb-3" onChange={(e) => {this.onItemChange(e)}}>
				      			{this.renderItemOptions()}
							</select>
				</div>
				<div className="form-group">
					<input type="text" className="form-control" value={this.domain.editVisionItemForm.visionItems[this.domain.editVisionItemForm.itemIndex].title} placeholder="Name" onChange={ (e)=> {this.onItemTitleChange(e)} }/>
				</div>
				<div className="form-group">
					<textarea className="form-control" rows="4" value={this.domain.editVisionItemForm.visionItems[this.domain.editVisionItemForm.itemIndex].description} placeholder="Explain what your vision looks like. What do you want to accomplish?" onChange={ (e)=> {this.onItemDescriptionChange(e)} }></textarea>
				</div>
				<div className="form-group">
					<input type="text" className="form-control" value={this.domain.editVisionItemForm.visionItems[this.domain.editVisionItemForm.itemIndex].url} placeholder="URL" onChange={ (e)=> {this.onItemUrlChange(e)} }/>
				</div>
				<div className="form-group">
					<select className="form-control form-control-sm mb-2" onChange={(e) => {this.onCategorySelect(e)}}>
						{this.renderCategoryOptions()}
					</select>
				</div>
				<button type="button" className="btn btn-primary mb-2" onClick={this.onSaveChanges}>Save changes</button>
				<div className="text-danger">{this.domain.editVisionItemForm.response}</div>
			</Modal>
		);
	}
}

export default observer(EditVisionItem);