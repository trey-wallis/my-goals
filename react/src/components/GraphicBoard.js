import React, { Component } from 'react';
import '../css/GraphicBoard.css';
import GraphicGoal from '../components/GraphicGoal';
import GraphicVision from '../components/GraphicVision';
import GraphicHome from '../components//GraphicHome';

class GraphicBoard extends Component {

	constructor(){
		super();
	}

	getBoard(id){
		switch(this.state.display){
			case 1:
				return this.renderVision();
			case 2:
				return this.renderGoal();
			default:
				return this.renderHome();
		}
	}

	render(){
		return(
			<div id="GraphicBoard" className="GraphicBoard col-6">
				{this.getBoard(this.state.display)}
			</div>);
	}

	renderVision(){
		return(<GraphicVision />);
	}

	renderGoal(){
		return(<GraphicGoal />);
	}

	renderHome(){
		return (<GraphicHome />);
	}
}

export default GraphicBoard;