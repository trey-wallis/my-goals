import React, {Component} from 'react';

import {observer} from 'mobx-react';
import RootStore from '../../store/RootStore';
import Scrollable from '../Scrollable';

class DropDownVision extends Component {

	constructor(){
		super();
		let {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;

		this.ui.dropDown.items = this.domain.visionData.categories.map((category, i) => {
			return category.name;
		});
	}

	onItemClick(i){
		this.ui.dropDown.active = i;
	}

	renderDropDownItems(){
		return this.ui.dropDown.items.map((item, i) => {
			return <button key={i} className={"dropdown-item" + this.ui.isDropDownItemActive(i)}
					 onClick={()=>{this.onItemClick(i)}}>{this.ui.dropDown.items[i]}</button>
		});
	}

	onViewAllClick = () => {
		this.ui.dropDown.active = -1;
	}

	render(){	
		return (
			<div className="btn-group">
				<button type="button" className="btn btn--reset dropdown-toggle text-tertiary" data-toggle="dropdown" id="navbar-dropdown">My Vision</button>
				<div className="dropdown-menu">
					{
					this.domain.visionData.categories.length > 0 ?
						<React.Fragment>
							<Scrollable minHeight="0px" maxHeight="100px" overflow="auto">
								{ this.renderDropDownItems() }
							</Scrollable>
							<div className="dropdown-divider"></div>
						</React.Fragment> : ''
					}
					<button type="button" className={"dropdown-item" + this.ui.isDropDownItemActive(-1)} onClick={this.onViewAllClick}>View All</button>
				    <div className="dropdown-divider"></div>
				    <button type="button" className="dropdown-item" data-toggle="modal" data-target="#modal-add-vision-category">Add Category</button>
				    <button type="button" className="dropdown-item" data-toggle="modal" data-target="#modal-add-vision-item">Add Item</button>
				    {this.domain.visionData.categories.length > 0 ? 
				    <button type="button" className="dropdown-item" data-toggle="modal" data-target="#modal-edit-vision-category">Edit Categories</button> : ''}
				    {this.domain.visionData.items.length > 0 ?
				  	<button type="button" className="dropdown-item" data-toggle="modal" data-target="#modal-edit-vision-item">Edit Items</button> : ''}
				</div>
			</div>);
	}
}

export default observer(DropDownVision);