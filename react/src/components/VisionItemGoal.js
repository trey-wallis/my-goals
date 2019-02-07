import React, { Component } from 'react';
import '../css/VisionItemGoal.css';

class VisionItemGoal extends Component {

	render(){
		return(
			<div className="VisionItemGoal">
				<div className="VisionItemGoal__left">
					<div className="row">
						<p className="VisionItemGoal__label col-6">Goal</p>
						<p className="VisionItemGoal__text col-6">{this.props.name}</p>
					</div>
					<div className="row">
						<p className="VisionItemGoal__label col-6">Progress</p>
						<p className="VisionItemGoal__text col-6">{this.props.progress}</p>
					</div>
					<div className="row">
						<p className="VisionItemGoal__label col-6">Due</p>
						<p className="VisionItemGoal__text col-6">{this.props.due}</p>
					</div>
				</div>
				<div className="VisionItemGoal__right">
					<button className="VisionItemGoal__button" onClick={this.props.onClick}>View</button>
				</div>
			</div>);
	}	
}

export default VisionItemGoal;