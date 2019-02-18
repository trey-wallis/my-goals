import React, {Component} from 'react';

class VisionItem extends Component {

	render(){
		const style_img = {
			maxWidth: '250px',
			maxHeight: 'auto'
		}
		const style_card = {
			border: '0',
			outline: '0'
		}
		return(
			<div className="col-sm-6 col-md-4 col-lg-3 mb-4">
				<div className="card d-flex flex-column align-items-center" style={style_card}>
					<img className="card-img-top" src={this.props.img} alt="img" style={style_img}/>
  					<div className="card-body">
	    				<h6 className="text-center">{this.props.title}</h6>
	    				<p className="text-center">{this.props.desc}</p>
 	 				</div>
				</div>
			</div>);
	}
}

export default VisionItem;