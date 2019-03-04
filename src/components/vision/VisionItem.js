import React, {Component} from 'react';

import '../../css/VisionItem.css';

import Scrollable from '../../components/Scrollable';
import RootStore from '../../store/RootStore';

class VisionItem extends Component {

	constructor(){
		super();
		const {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
	}

	onCard = (id) => {
		this.domain.addVisionNoteItemId = id;
		this.domain.addVisionNoteResponse = "";
		this.domain.getNote();
	}

	render(){
		return(
			<div className="col-sm-6 col-lg-4 no-gutters">
				<div className="Vision__card card d-flex flex-column align-items-center border-0" onClick={() => {this.onCard(this.props.itemId)}}>
					<div className="Vision__crop">
						<img className="Vision__img card-img-top" src={this.props.img} alt="img"/>
					</div>
  					<div className="Vision__card-body card-body">
	    				<h6 className="text-center text-primary">{this.props.title}</h6>
	    				<Scrollable height="110px" width="280px" margin="0px 17px">
	    					<p className="Vision__description text-dark px-3">{this.props.desc}</p>
	    				</Scrollable>
 	 				</div>
				</div>
			</div>);
	}
}

export default VisionItem;