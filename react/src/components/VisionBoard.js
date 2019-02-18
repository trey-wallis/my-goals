import React, {Component} from 'react';
import {observer} from 'mobx-react';
import VisionItem from './vision/VisionItem.js';
import RootStore from '../store/RootStore';

class VisionBoard extends Component {

	constructor(){
		super();
		const {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
	}

	renderItems(){
		let queue = [];		
		console.log(this.domain.visionItems);
		for (let i = 0; i < this.domain.visionItems.length; i++){
			const item = this.domain.visionItems[i];
			console.log(item);
			queue.push(<VisionItem key={i} img={item.url} title={item.title} desc={item.description} />);
		}
		return queue;
	}

	render(){
		return(
			<div className="menu">
				<div className="container h-100">
					<h3 className="py-5 text-center">{this.ui.dropDownTitle}</h3>
					<div className="row justify-content-center">
						{ this.renderItems() }
					</div>
				</div>
			</div>);
	}
}

export default observer(VisionBoard);