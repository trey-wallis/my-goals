import React, {Component} from 'react';
import "../css/GraphicHomeItem.css";

class GraphicHomeItem extends Component {

	render(){
		return (
			<div className="GraphicHomeItem">
				<div className="GraphicHomeItem__circle">
					<img className="circle__img" alt="Vision Item" src="https://placeimg.com/150/150/any"/>
					<div className="circle__text">{this.props.text}</div>
				</div>
				<div className="GraphicHomeItem__bar">
					<img className="bar__img" alt="Vision Item" src="https://placeimg.com/150/150/any"/>
					<div className="bar__text">{this.props.text}</div>
				</div>
			</div>);
	}
}

export default GraphicHomeItem;