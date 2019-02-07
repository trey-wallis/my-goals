import React, {Component} from 'react';
import '../../css/GraphicCategory.css';
import GraphicCategoryItem from './GraphicCategoryItem';

class GraphicCategory extends Component {

	renderItems(items, type){
		return items.map((item, i) => {
			return (<GraphicCategoryItem
						key={i}
						name={items[i]['name']}
						description={items[i]['description']}
						month={items[i]['month']}
						activated={items[i]['activated']}
						url={items[i]['url']}
					/>);
		});
	}

	render(){
		return (
			<div className="GraphicCategory">
				<div className="GraphicCategory__circle">
					<header className="GraphicCategory__circle-header">
						{this.props.name}
					</header>
					<div className="GraphicCategory__circle-items">
						{this.renderItems(this.props.items)}
					</div>
				</div>
				<div className="GraphicCategory__bar">
					<header className="GraphicCategory__bar-header">
						<div className="GraphicCategory__bar-text">{this.props.name}</div>
					</header>
					<div className="GraphicCategory__bar-items">
						{this.renderItems(this.props.items)}
					</div>
				</div>
			</div>);
	}
}

export default GraphicCategory;