import React, {Component} from 'react';
import {observer} from 'mobx-react';

import RootStore from '../store/RootStore';
import $ from 'jquery';

import AddVisionCategory from './vision/AddVisionCategory';
import AddVisionItem from './vision/AddVisionItem';
import EditVisionItem from './vision/EditVisionItem.js';
import EditVisionCategory from './vision/EditVisionCategory.js';
import AddVisionNote from './vision/AddVisionNote';
import VisionItem from './vision/VisionItem';
import DeleteVisionItem from './vision/DeleteVisionItem';

import Widget from './widget/Widget';
import SVG from '../SVG';
import './VisionBoard.css';

class VisionBoard extends Component {

	componentDidMount(){
		$('.navbar-collapse').collapse('hide');
		RootStore.store.ui.navItemActive = 1;
		RootStore.store.ui.dropDown.id = 1;
	}

	renderItems(catId){
		let hasRenderedItems = false;
		const items = RootStore.store.domain.visionData.items.map((item, i) => {
			if (item.categoryid === catId){
				hasRenderedItems = true;
				return <VisionItem key={i} img={item.url} title={item.title} desc={item.description} itemId={item.id} />
			} else {
				return '';
			}
		});
		if (hasRenderedItems){
			return items;
		} else {
			return this.renderNoItems();
		}
	}

	renderNoItems = () => {
		return (<p>There are no items to display.<br/>
				Would you like to <span className="text-primary" data-toggle="modal" data-target="#modal-add-vision-item">add</span> an item?</p>);
	}

	renderNoCategories = () => {
		return (
			<p className="text-center">There are no categories to display.<br/>
			Would you like to <span className="text-primary" data-toggle="modal" data-target="#modal-add-vision-category">add</span> a category?</p>
		);
	}

	renderCategories = () => {
		return RootStore.store.domain.visionData.categories.map((category, i) => {
			if(RootStore.store.ui.dropDown.active === i || RootStore.store.ui.dropDown.active === -1){
				return(
					<React.Fragment key={i}>
						<h3 className="text-center text-white p-4">{category.name}</h3>
						<div className="row justify-content-center">
							{this.renderItems(category.id)}
						</div>
					</React.Fragment>
				);
			} else { 
				return '';
			}
		});
	}

	render(){
		return(
			<div className="vision-padding">
				{RootStore.store.domain.visionData.categories.length > 0 ? this.renderCategories() : this.renderNoCategories()}
				<AddVisionItem/>
				<AddVisionCategory/>
				{RootStore.store.domain.visionData.categories.length > 0 ? <EditVisionCategory/> : ''}
				{RootStore.store.domain.visionData.items.length > 0 ? <EditVisionItem/> : ''}
				<AddVisionNote/>
				<DeleteVisionItem/>
			</div>
		);
	}
}

export default observer(VisionBoard);