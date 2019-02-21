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

	onCardClick = (id) => {
		this.domain.addVisionNoteItemId = id;
		this.domain.addVisionNoteResponse = "";
		this.domain.getNote();
	}

	render(){
		return(
			<div className="col-sm-6 col-md-4 col-lg-3 mb-3">
				<div className="card d-flex flex-column align-items-center Vision__card" onClick={() => {this.onCardClick(this.props.itemId)}}>
					<img className="card-img-top Vision__img" src={this.props.img} alt="img"/>
  					<div className="card-body">
	    				<h6 className="text-center">{this.props.title}</h6>
	    				<p className="text-center">{this.props.desc}</p>
 	 				</div>
				</div>
			</div>);
	}
}

export default VisionItem;