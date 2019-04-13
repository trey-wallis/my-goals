import React, { Component } from 'react';

class DropDown extends Component {

	render(){
		return(
			<div className="btn-group">
				<button type="button" className="btn dropdown-toggle text-tertiary" data-toggle="dropdown" id="navbar-dropdown">{this.props.title}</button>
				<div className="dropdown-menu">
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default DropDown;