import React, {Component} from 'react';
import {observer} from 'mobx-react';

import RootStore from '../../store/RootStore';

class AddVisionCategory extends Component {

	constructor(){
		super();
		const {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
	}

	onNameChange = (e) => {
		this.domain.addVisionCategoryForm.name = e.target.value;
	}


	onAdd = () => {
		this.domain.postAddCategory();
	}

	render(){
		return(
			<div className="modal fade" id="modal-add-vision-category" role="dialog">
				<div className="modal-dialog" role="document">
			    	<div className="modal-content">
			    		<div className="modal-header">
			    			<h5 className="modal-title">Add Vision Category</h5>
			    			<button type="button" className="close" data-dismiss="modal">
			          			<span>&times;</span>
			       			</button>
			      		</div>
			      		<div className="modal-body">
							<div className="form-group">
								<input type="text" className="form-control" placeholder="Name" id="add-vision-category-name" onChange={ (e)=> {this.onNameChange(e)} }/>
							</div>
						</div>
			      		<div className="modal-footer justify-content-between">
			      			<div className="text-danger">{this.domain.addVisionCategoryForm.response}</div>
			      			<div>
			      				<button type="button" className="btn btn-primary mr-2" onClick={this.onAdd}>Add Category</button>
			        			<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
			        		</div>
			      		</div>
			    	</div>
			  	</div>
			</div>);
	}
}

export default observer(AddVisionCategory);