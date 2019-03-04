import React, {Component} from 'react';
import {observer} from 'mobx-react';

import RootStore from '../../store/RootStore';

class AddVisionItem extends Component {

	constructor(){
		super();
		const {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
	}

	onNameChange = (e) => {
		this.domain.addVisionItemName = e.target.value;
	}

	onDescriptionChange = (e) => {
		this.domain.addVisionItemDescription = e.target.value;
	}

	onUrlChange = (e) => {
		this.domain.addVisionItemUrl = e.target.value;
	}

	onCategoryChange = (e) => {
		this.domain.addVisionItemCategoryId = e.target.value;
	}


	onAdd = () => {
		this.domain.postAddVisionItem();
	}

	renderCategories(){
		return this.domain.visionCategories.map((category, i) => {
			return <option key={i} value={category.id}>{category.name}</option>;
		});
	}

	render(){
		return(
			<div className="modal fade" id="modal-add-vision-item" role="dialog">
				<div className="modal-dialog" role="document">
			    	<div className="modal-content">
			    		<div className="modal-header">
			    			<h5 className="modal-title">Add Vision Item</h5>
			    			<button type="button" className="close" data-dismiss="modal">
			          			<span>&times;</span>
			       			</button>
			      		</div>
			      		<div className="modal-body">
			      			<h6>Category</h6>
			      			<div className="form-group">
			      				<select className="form-control form-control-sm mb-2" onChange={ (e)=> { this.onCategoryChange(e)} }>
			      					{this.renderCategories()}
								</select>
			      			</div>
			      			<h6>Vision Item</h6>
							<div className="form-group">
								<input type="text" className="form-control" value={this.domain.addVisionItemName} placeholder="Name" onChange={ (e)=> {this.onNameChange(e)} }/>
							</div>
							<div className="form-group">
								<textarea className="form-control" value={this.domain.addVisionItemDescription} placeholder="Explain what your vision looks like. What do you want to accomplish?" onChange={ (e)=> {this.onDescriptionChange(e)} }></textarea>
							</div>
							<div className="form-group">
								<input type="text" className="form-control" value={this.domain.addVisionItemUrl} placeholder="URL" onChange={ (e)=> {this.onUrlChange(e)} }/>
							</div>
						</div>
			      		<div className="modal-footer justify-content-between">
			      			<div className="text-danger">{this.domain.addVisionItemResponse}</div>
			      			<div>
			      				<button type="button" className="btn btn-primary mr-2" onClick={this.onAdd}>Add Vision Item</button>
			        			<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
			      			</div>
			      		</div>
			    	</div>
			  	</div>
			</div>);
	}
}

export default observer(AddVisionItem);