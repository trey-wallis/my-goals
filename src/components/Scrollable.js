import React, {Component} from 'react';
import "../css/Scrollable.css";

class Scrollable extends Component {

	render(){
		const styleScrollable = {
			width: "250px",
			height: this.props.height,
			overflow: "hidden",
			paddingRight: "5px",
		}

		const styleScrollableContainer = {
			width: "100%",
			height: "100%",
			overflow: "auto",
			margin: "0px 17px",
			paddingRight: "5px",
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