import React, {Component} from 'react';

import '../../css/VisionItem.css';

class VisionItem extends Component {

	render(){
		
		return(
			<div className="col-sm-6 col-md-4 col-lg-3">
				<div className="card d-flex flex-column align-items-center Vision__card">
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