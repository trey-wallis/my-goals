import React, {Component} from 'react';

import RootStore from '../../store/RootStore';
import Scrollable from '../Scrollable';

class DropDownMenuVision extends Component {

	constructor(){
		super();
		let {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
	}

	render(){	
		return (
			<div className="btn-group">
				<button type="button" className="btn btn--reset dropdown-toggle text-tertiary" data-toggle="dropdown" id="navbar-dropdown">{this.ui.dropDownMenuTitle}</button>
				<div className="dropdown-menu">
					{
					this.domain.visionCategories.length > 0 ?
						<Scrollable height="100px">
						{
							this.ui.dropDownMenuItems.map((item, i) => {
								return <button key={i} className={this.ui.isDropDownMenuItemActive(i) + " dropdown-item"} onClick={()=>{this.ui.dropDownMenuActive = i}}>{this.ui.dropDownMenuItems[i]}</button>
							})
						}
						</Scrollable> : ''
					}
					<div className="dropdown-divider"></div>
					<button type="button" className="dropdown-item" onClick={this.onViewAll}>View All</button>
				    <div className="dropdown-divider"></div>
				    <button type="button" className="dropdown-item" data-toggle="modal" data-target="#modal-add-vision-category">Add Category</button>
				    <button type="button" className="dropdown-item" data-toggle="modal" data-target="#modal-add-vision-item">Add Vision Item</button>
				    <button type="button" className="dropdown-item" data-toggle="modal" data-target="">Edit</button>
				</div>
			</div>);
	}
}

export default DropDownMenuVision;