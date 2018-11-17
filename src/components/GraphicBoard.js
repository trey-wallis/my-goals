import React, { Component } from 'react';
import '../css/GraphicBoard.css';

class GraphicBoard extends Component {

	constructor(){
		super();
		this.state = {
			display: 0
		}
	}

	getBoard(id){
		switch(this.state.display){
			case 1:
				return this.renderVision();
			case 2:
				return this.renderGoal();
			default:
				return this.renderDefault();
		}
	}

	render(){
		return(
			<div className="GraphicBoard col-6">
				{this.getBoard(this.state.display)}
			</div>);
	}

	renderVision(){
		return(<div>Vision</div>);
	}

	renderGoal(){
		return(<div>Goal</div>);
	}

	renderDefault(){
		return (<div>Default</div>);
	}
}

export default GraphicBoard;