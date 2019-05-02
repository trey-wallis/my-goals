import React, {Component} from 'react';

import RootStore from '../../store/RootStore';

import './Widget.css';

class Widget extends Component {

	render(){
		return(
			<div className="widget">
				<div className="d-flex flex-wrap">
					{this.props.children}
				</div>
			</div>);
	}
}

export default Widget;