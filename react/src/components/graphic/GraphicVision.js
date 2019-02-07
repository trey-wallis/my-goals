import React, {Component} from 'react';
import {Categories} from '../../data/Categories.js';
import '../../css/GraphicVision.css';
import GraphicCategory from './GraphicCategory.js';

class GraphicVision extends Component {


	renderCategory(i){
		return (
			<GraphicCategory
				key={i}
				name={Categories[i]['name']}
				items={Categories[i]['items']}/>);
	}


	renderCategories(){
		let renderList = [];
		for (let i = 0; i < Categories.length; i++){
			renderList.push(this.renderCategory(i));
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

export default GraphicVision;