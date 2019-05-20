import React, {Component} from 'react';

import {observer} from 'mobx-react';
import RootStore from '../../store/RootStore';
import DropDown from './DropDown';

class DropDownVision extends Component {

	constructor(){
		super();
		let {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
	}

	render(){	
		return (
			<DropDown title="Options">
				<button className="dropdown-item" data-toggle="modal" data-target="#modal-add-vision-category">Add Category</button>
				<button className="dropdown-item" data-toggle="modal" data-target="#modal-add-vision-item">Add Item</button>
				{this.domain.visionData.categories.length > 0 ? 
					<button className="dropdown-item" data-toggle="modal" data-target="#modal-edit-vision-category">Edit Category</button> : ''}
				{this.domain.visionData.items.length > 0 ?
					<button className="dropdown-item" data-toggle="modal" data-target="#modal-edit-vision-item">Edit Item</button> : ''}
				{this.domain.visionData.items.length > 0 ?
					<button className="dropdown-item" data-toggle="modal" data-target="#modal-delete-vision-item">Delete Item</button>: ''}
				{this.domain.visionData.categories.length > 0 ?
					<button className="dropdown-item" data-toggle="modal" data-target="#modal-delete-vision-category">Delete Category</button> : ''}
			</DropDown>
		);
	}
}

export default observer(DropDownVision);