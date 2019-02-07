import React, {Component} from 'react';
import '../css/DeadlineGoal.css';

class DeadlineGoal extends Component {

	render(){
		return(
			<div className="DeadlineGoal">
				<div className="DeadlineGoal__left">
					<div className="row">
						<p className="DeadlineGoal__label col-6">Goal</p>
						<p className="DeadlineGoal__text col-6">{this.props.name}</p>
					</div>
					<div className="row">
						<p className="DeadlineGoal__label col-6">Progress</p>
						<p className="DeadlineGoal__text col-6">{this.props.progress}</p>
					</div>
					<div className="row">
						<p className="DeadlineGoal__label col-6">Due</p>
						<p className="DeadlineGoal__text col-6">{this.props.due}</p>
					</div>
				</div>
				<div className="DeadlineGoal__right">
					<button className="DeadlineGoal__button" onClick={this.props.onClick}>View</button>
				</div>
			</div>);
	}
}

export default DeadlineGoal;