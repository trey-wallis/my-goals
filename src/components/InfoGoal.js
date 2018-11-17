import React, {Component} from react;
import '../css/InfoGoal.css';

class InfoGoal extends Component {

	render(){
		return(
			<div className="InfoGoal">
				<div className="InfoGoal__left">
					<p className="InfoGoal__label">Label</p>
					<p className="InfoGoal__text">Text</p>
				</div>
				<div className="InfoGoal__right">
					<button>View Goal</button>
				</div>
			</div>);
	}
}