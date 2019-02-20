import React, {Component} from 'react';
import {observer} from 'mobx-react';
import VisionItem from './vision/VisionItem.js';
import RootStore from '../store/RootStore';

class VisionBoard extends Component {

	constructor(){
		super();
		const {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
	}

	renderItems(category){
		const filtered = this.domain.visionItems.filter((item, i) => {
			return (item.categoryid === category);
		});
		if (filtered.length > 0){
			return this.domain.visionItems.map((item, i) => {
				if (item.categoryid === category){
					return <VisionItem key={i} img={item.url} title={item.title} desc={item.description} />
				}
				return '';
		});
		} else {
			return (
			<div>
			<p>There are no items to display.<br/>
			Would you like to <span className="text-danger" data-toggle="modal" data-target="#modal-add-vision-item">add</span> items?</p>
			</div>);
		}
	}

	renderCategories(){
		if (this.domain.visionCategories.length > 0){
			return this.domain.visionCategories.map((category, i) => {
				if(i === this.ui.dropDownMenuActive || this.ui.dropDownMenuActive === -1){
					return(
						<div key={i}>
							<h3 className="pb-5 text-center">{category.name}</h3>
							<div className="row justify-content-center">
								{this.renderItems(category.id)}
							</div>
						</div>
					);
				}
				return '';
			});
		} else {
			return (
			<div>
			<p>Ther are no categories to display.<br/>
			Would you like to <span className="text-danger" data-toggle="modal" data-target="#modal-add-vision-category">add</span> a category?</p>
			</div>);
		}
	}

	render(){
		return(
			<div className="menu">
				<div className="container h-100 pt-5">
					{this.renderCategories()}
				</div>
			</div>);
	}
}

export default observer(VisionBoard);