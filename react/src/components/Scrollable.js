import React, {Component} from 'react';
import "../css/Scrollable.css";

class Scrollable extends Component {

	render(){
		const styleScrollable = {
			height: this.props.height
		}

		return(
			<div className="Scrollable" style={styleScrollable}>
				{this.props.children}
			</div>);
	}

}

export default Scrollable;