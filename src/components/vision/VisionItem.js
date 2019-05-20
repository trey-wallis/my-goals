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

	onCard = (id) => {
		this.domain.addVisionNoteForm.visionItemId = id;
		this.domain.addVisionNoteForm.response = "";
		this.domain.fetchNote();
	}

	render(){
		return(
			<div className="Vision__card card d-flex flex-column align-items-center border-0" onClick={() => {this.onCard(this.props.itemId)}}>
				<img className="Vision__img" src={this.props.img} alt="img"/>
  				<div className="card-body Vision__card-body">
	   				<h6 className="text-center text-primary">{this.props.title}</h6>
	   				<p className="Vision__description text-black">{this.props.desc}</p>
 	 			</div>
			</div>);
	}
}

export default VisionItem;