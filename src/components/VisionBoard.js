import React, {Component} from 'react';
import {observer} from 'mobx-react';

import RootStore from '../store/RootStore';
import $ from 'jquery';

import AddVisionCategory from './vision/AddVisionCategory';
import AddVisionItem from './vision/AddVisionItem';
import EditVision from '../components/vision/EditVision.js';
import AddVisionNote from '../components/vision/AddVisionNote';
import VisionItem from './vision/VisionItem';

import '../css/VisionBoard.css';

class VisionBoard extends Component {

	constructor(){
		super();
		const {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
	}

	componentDidMount(){
		$('.navbar-collapse').collapse('hide');
		this.ui.navItemActive = 1;
		this.ui.changeDropDownMenu("vision", "My Vision");
	}

	renderItems(category){
		const items = this.domain.visionItems.map((item, i) => {
				if (item.categoryid === category){
					return <VisionItem key={i} img={item.url} title={item.title} desc={item.description} itemId={item.id} />
				}
				return '';
			});
		if (items.length > 0){
			return items;
		} else {
			return this.renderItemMessage();
		}
	}

	renderItemMessage = () => {
		return (<p>There are no items to display.<br/>
				Would you like to <span className="text-primary" data-toggle="modal" data-target="#modal-add-vision-item">add</span> items?</p>);
	}

	renderCategories(){
		return this.domain.visionCategories.map((category, i) => {
			if(i === this.ui.dropDownMenuActive || this.ui.dropDownMenuActive === -1){
				return(
					<div key={i} className="p-4">
						<h3 className="text-center text-dark">{category.name}</h3>
						<div className="row justify-content-center">
							{this.renderItems(category.id)}
						</div>
					</div>
				);
			}
			return '';
		});
	}

	renderCategoryMessage = () => {
		return (
			<div className="p-4">
				<h3 className="text-center">My Vision Board</h3>
				<div className="text-center">
				<p>There are no categories to display.<br/>
				Would you like to <span className="text-primary" data-toggle="modal" data-target="#modal-add-vision-category">add</span> a category?</p>
				</div>
			</div>);
	}

	render(){
		return(
			<div className="VisionBoard">
				<div className="container bg-white h-100">
					{this.domain.visionCategories.length > 0 ? this.renderCategories() : this.renderCategoryMessage()}
				</div>
				<EditVision />
				<AddVisionItem />
				<AddVisionCategory />
				<AddVisionNote />
			</div>);
	}
}

export default observer(VisionBoard);