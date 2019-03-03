import React, {Component} from 'react';
import "../css/Scrollable.css";

class Scrollable extends Component {

	render(){
		const styleScrollable = {
			position: "absolute",
			width: "250px",
			maxHeight: this.props.maxHeight,
			height: this.props.height,
			overflowY: "hidden",
		}

		const styleScrollableContainer = {
			position: "absolute",
			width: "100%",
			height: "100%",
			overflowY: "auto"
		}

		return(
			<div className="Scrollable" style={styleScrollable}>
				<div className="Scrollable__container" style={styleScrollableContainer}>
					{this.props.children}
				</div>
			</div>);
	}

}

export default Scrollable;