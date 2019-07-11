import React, {Component} from 'react';

class ProgressBar extends Component {

	render(){
		const progressStyle = {
			width: this.props.width + '%',
		}

		const progressOuterStyle = {
			height: this.props.height + 'px'
		}

		return(
			<div className="progress" style={progressOuterStyle}>
  				<div className={this.props.style} role="progressbar" style={progressStyle}></div>
			</div>);
	}
}

export default ProgressBar;