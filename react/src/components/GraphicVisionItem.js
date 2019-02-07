import React, {Component} from 'react';
import '../css/GraphicVisionItem.css';

class GraphicVisionItem extends Component {

	render(){
		return (
			<div className="GraphicVisionItem">
				<img className="GraphicVisionItem__img" alt="Star" src="https://placeimg.com/150/150/any"/>
				<div className="GraphicVisionItem__text">{this.props.text}</div>
			</div>
		);
	}
}

export default GraphicVisionItem;