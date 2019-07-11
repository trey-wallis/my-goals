import React, {Component} from 'react';
import {observer} from 'mobx-react';

import RootStore from '../../store/RootStore';
import Modal from '../Modal';

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
			<Modal title="Add Vision Category" id="modal-add-vision-category">
				<div className="form-group">
					<input type="text" className="form-control" placeholder="Name" id="add-vision-category-name" onChange={ (e)=> {this.onNameChange(e)} }/>
				</div>
				<button type="button" className="btn btn-primary mb-2" onClick={this.onAdd}>Add Category</button>
				<div className="text-danger">{this.domain.addVisionCategoryForm.response}</div>
			</Modal>);
	}
}

export default observer(AddVisionCategory);