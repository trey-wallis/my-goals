import React, {Component} from 'react';
import {observer} from 'mobx-react';
import VisionItem from './vision/VisionItem';
import RootStore from '../store/RootStore';
import AddVisionCategory from './vision/AddVisionCategory';
import AddVisionItem from './vision/AddVisionItem';
import EditVision from '../components/vision/EditVision.js';
import AddVisionNote from '../components/vision/AddVisionNote';

import $ from 'jquery';

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
	}

	renderItems(category){
		const filtered = this.domain.visionItems.filter((item, i) => {
			return (item.categoryid === category);
		});
		if (filtered.length > 0){
			return this.domain.visionItems.map((item, i) => {
				if (item.categoryid === category){
					return <VisionItem key={i} img={item.url} title={item.title} desc={item.description} itemId={item.id} />
				}
				return '';
		});
		} else {
			return (
			<div className="VisionBoard__display-no-item">
				<p>There are no items to display.<br/>
				Would you like to <span className="text-danger" data-toggle="modal" data-target="#modal-add-vision-item">add</span> items?</p>
			</div>);
		}
	}

	renderCategories(){
		return this.domain.visionCategories.map((category, i) => {
			if(i === this.ui.dropDownMenuActive || this.ui.dropDownMenuActive === -1){
				return(
					<div key={i}>
						<h3 className="text-center text-dark p-4">{category.name}</h3>
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