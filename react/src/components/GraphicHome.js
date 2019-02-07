import React, {Component} from 'react';
import "../css/GraphicHome.css";
import GraphicHomeCategory from "../components/GraphicHomeCategory";
import {Categories} from "../data/Categories.js";

class GraphicHome extends Component {

	constructor(){
		super();
		this.state = {
			categories: Categories
		}
	}

	renderRow(cat1, cat2){
		return (
			<div className="row">
				{this.renderCategory(cat1)}
				{this.renderCategory(cat2)}
			</div>);
	}

	renderCategories(categories){
		let renderList = [];
		for (let i = 0; i < categories.length; i+=2){
			renderList.push(this.renderRow(categories[i], categories[i+1]));
		}
		return renderList;
	}

	renderCategory(category){
		if (typeof category !== "undefined"){
			return (
				<GraphicHomeCategory
					title={category["title"]}
					items={category["items"]}/>);
		}
	}

	render(){
		return (
		<div className="GraphicHome">
			{this.renderCategories(this.state.categories)}
		</div>);
	}
}

export default GraphicHome;