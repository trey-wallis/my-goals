import React, {Component} from 'react';
import '../css/InfoGoal.css';

class InfoGoal extends Component {

	render(){
		return(
			<div className="InfoGoal">
				<div className="InfoGoal__left">
					<div className="row">
						<p className="InfoGoal__label col-6">Goal</p>
						<p className="InfoGoal__text col-6">{this.props.name}</p>
					</div>
					<div className="row">
						<p className="InfoGoal__label col-6">Progress</p>
						<p className="InfoGoal__text col-6">{this.props.progress}</p>
					</div>
					<div className="row">
						<p className="InfoGoal__label col-6">Due</p>
						<p className="InfoGoal__text col-6">{this.props.due}</p>
					</div>
				</div>
				<div className="InfoGoal__right">
					<button className="InfoGoal__button" onClick={this.props.onClick}>View</button>
				</div>
			</div>);
	}
}

export default InfoGoal;