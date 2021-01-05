import React, { Component } from 'react';

import './DropDown.css';

class DropDown extends Component {

	render(){
		return(
			<div className="dropdown">
				<button type="button" className="btn dropdown-toggle text-light" data-toggle="collapse" data-target="#external-content">{this.props.title}</button>
				<div className="collapse" id="external-content">
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default DropDown;