import React, { Component } from 'react';

import './DashCard.css';

class DashCard extends Component {

	render(){

		return (
			<div className="card card-sm bg-tertiary text-light">
				<div className="card-header">
					{this.props.title}
				</div>
				<div className="card-body">
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default DashCard;