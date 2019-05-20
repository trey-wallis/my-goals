import React, {Component} from 'react';

import '../../css/VisionItem.css';

import RootStore from '../../store/RootStore';

class VisionItem extends Component {

	constructor(){
		super();
		const {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
	}

	onClick = (id) => {
		this.domain.postCompleteVisionItem(id);
	}

	renderBody = (complete) => {
		let name = "card-body Vision__card-body";
		if (complete)
			name = "card-body Vision__card-body bg-success"
		return (
				<div className={name}>
	   				<h6 className="text-center text-primary">{this.props.title}</h6>
	   				<p className="text-black">{this.props.description}</p>
 	 			</div>
 	 		);
	}

	render(){
		return(
			<div className="Vision__card card d-flex flex-column align-items-center border-0" onClick={() => {this.onClick(this.props.id)}}>
				<img className="Vision__img" src={this.props.img} alt="img"/>
				{this.renderBody(this.props.complete)}
			</div>);
	}
}

export default VisionItem;