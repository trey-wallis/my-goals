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

	renderItems(){
		if(this.domain.visionCategories.length > 0){
			const categoryId = this.domain.visionCategories[this.ui.dropDownActive].id;
			return this.domain.visionItems.map((item, i) => {
				if (item.categoryid === categoryId){
					return <VisionItem key={i} img={item.url} title={item.title} desc={item.description} />
				}
				return '';
			});
		} else {
			return <p>No categories to display</p>
		}
	}

	render(){
		return(
			<div className="menu">
				<div className="container h-100">
					<h3 className="py-5 text-center">{this.ui.dropDownTitle}</h3>
					<div className="row justify-content-center">
						{this.renderItems()}
					</div>
				</div>
			</div>);
	}
}

export default observer(VisionBoard);