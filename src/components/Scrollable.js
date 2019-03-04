import React, {Component} from 'react';

class Scrollable extends Component {

	render(){
		const styleScrollable = {
			width: this.props.width,
			height: this.props.height,
			overflow: "hidden",
		}

		const styleScrollableContainer = {
			width: "100%",
			height: "100%",
			overflow: "auto",
			margin: "0px 17px",
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