import React, {Component} from 'react';
import '../../css/GraphicCategoryItem.css';

class GraphicCategoryItem extends Component {

	render(){
		return (
			<div className="GraphicHomeItem">
				<div className="GraphicCategoryItem__circle">
					<img className="GraphicCategoryItem__circle-img" alt="Vision Item" src={this.props.url}/>
					<div className="GraphicCategoryItem__circle-name">{this.props.name}</div>
				</div>
				<div className="GraphicCategoryItem__circle-description">{this.props.description}</div>
				<div className="GraphicCategoryItem__bar">
					<img className="GraphicCategoryItem__bar-img" alt="Vision Item" src={this.props.url}/>
					<div className="GraphicCategoryItem__text">
						<div className="GraphicCategoryItem__bar-name">{this.props.name}</div>
						<div className="GraphicCategoryItem__bar-description">{this.props.description}</div>
					</div>
				</div>
			</div>);
	}
}

export default GraphicCategoryItem;