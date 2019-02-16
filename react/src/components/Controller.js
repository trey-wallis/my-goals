import React, {Component} from 'react';
import {observer} from 'mobx-react';
import '../css/Controller.css';
import addIcon from '../img/icons/add-icon.png';
import editIcon from '../img/icons/edit-icon.png';
import RootStore from '../store/RootStore';

class Controller extends Component {
	
	constructor(){
		super();
		let {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
	}

	onAdd = () => {
		this.ui.vision = "add";
	}

	onEdit = () => {
		this.ui.vision = "edit";
	}

	render() {
		const {ui, domain} = RootStore.store;
		return (
			<div className="Controller">
				<ul className="Controller__ul">
					<li className="Controller__li" onClick={this.onAdd}>
						<img className="Controller__img" src={addIcon} alt="add"/>
					</li>
					<li className="Controller__li" onClick={this.onEdit}>
						<img className="Controller__img" src={editIcon} alt="edit"/>
					</li>
				</ul>
			</div>
		);
	}
}

export default observer(Controller);