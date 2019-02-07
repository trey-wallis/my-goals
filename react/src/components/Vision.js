import React, {Component} from 'react';
import GraphicBoard from '../components/GraphicBoard';

import RootStore from '../store/RootStore';

class Vision extends Component {

	constructor(){
		super();
		let {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
	}

	render(){
		return (
			<div className="Vision">
				{this.ui.graphic}
			</div>);
	}
}

export default Vision;