import React, {Component} from 'react';
import "../css/GraphicHomeCategory.css";
import GraphicHomeItem from "../components/GraphicHomeItem";

class GraphicHomeCategory extends Component {

	renderItems(items, type){
		return items.map((item, i) => {
			return (<GraphicHomeItem text={items[i]}/>);
		});
	}

	render(){
		return (
			<div className="GraphicHomeCategory">
				<div className="GraphicHomeCategory__circle col-6">
					<header className="GraphicHomeCategory__circle-header">
						{this.props.title}
					</header>
					<div className="GraphicHomeCategory__circle-items">
						{this.renderItems(this.props.items)}
					</div>
				</div>
				<div className="GraphicHomeCategory__bar">
					<header className="GraphicHomeCategory__bar-header">
						<div className="bar-header__text">{this.props.title}</div>
					</header>
					<div className="GraphicHomeCategory__bar-items">
						{this.renderItems(this.props.items)}
					</div>
				</div>
			</div>);
	}
}

export default GraphicHomeCategory;