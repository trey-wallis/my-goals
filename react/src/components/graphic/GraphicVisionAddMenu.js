import React, {Component} from 'react';

import RootStore from '../../store/RootStore';

class GraphicVisionAddMenu extends Component {

	constructor(){
		super();
		let {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
	}

	onCategoryNameChange = (e) => {
		this.ui.vCategoryName = e.target.value;
	}

	onItemNameChange = (e) => {
		this.ui.vItemName = e.target.value;
	}

	onItemDescriptionChange = (e) => {
		this.ui.vItemDescription = e.target.value;
	}

	onNewCategory = () => {
		this.domain.postVisionCategory();
	}

	onNewItem = () => {
		this.domain.postVisionItem();
	}

	onClose = () => {
		this.ui.visionMenu = "none";
	}

	render(){
		return (
			<div className="GraphicVisionAddMenu">
				<div className="GraphicVisionAddMenu__outer">
					<button className="GraphicVisionAddMenu__close" onClick={this.onClose}>X</button>
					<div className="GraphicVisionAddMenu__inner">
						<div className="GraphicVisionAddMenu__title">Vision Board</div>
						<div className="GraphicVisionAddMenu__header">New Category</div>
						<div className="GraphicVisionAddMenu__item">
							<input type="text" placeholder="Name" onChange={(e)=>{this.onCategoryNameChange(e)}}/>
						</div>
						<button className="GraphicVisionAddMenu__item" onClick={this.onNewCategory}>Submit</button>
						<div className="GraphicVisionAddMenu__header">New Item</div>
						<div className="GraphicVisionAddMenu__item">
							<input type="text" placeholder="Name" onChange={(e)=>{this.onItemNameChange(e)}}/>
							<input type="text" placeholder="Description" onChange={(e)=>{this.onItemDescriptionChange(e)}}/>
						</div>
						<button className="GraphicVisionAddMenu__item" onClick={this.onNewItem}>Submit</button>
					</div>
				</div>
			</div>);
	}
}

export default GraphicVisionAddMenu;