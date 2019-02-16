import React, {Component} from 'react';
import {observer} from 'mobx-react';
import '../../css/GraphicVision.css';
import GraphicCategory from './GraphicCategory.js';

import RootStore from '../../store/RootStore';

class GraphicVision extends Component {


	constructor(){
		super();
		const {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
	}

	renderCategory(category, i){
		return (
			<GraphicCategory
				key={i}
				name={category['name']}
				items={category['items']}/>);
	}


	renderCategories(){
		let renderList = [];
		const categories = this.domain.categoriesData;
		for (let i = 0; i < categories.length; i++){
			renderList.push(this.renderCategory(categories[i], i));
		}
		return renderList;
	}

	render(){
		return(
			<div className="GraphicVision col-6">
				{this.renderCategories()}
			</div>);
	}
}

export default observer(GraphicVision);