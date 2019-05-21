import React, {Component} from 'react';
import {observer} from 'mobx-react';

import './IdeaPanel.css';
import RootStore from '../store/RootStore';

class IdeaPanel extends Component {

	constructor(){
		super();
		const {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
	}

	onChange = (e) => {
		this.domain.addNote.form.text = e.target.value;
	}

	postText = () => {
		this.domain.postAddNote();
	}

	openPanel = () => {
		this.ui.openIdeaPanel = true;
	}

	closePanel = () => {
		this.ui.openIdeaPanel = false;
	}

	renderButton = () => {
		return (
			<div className="idea-panel idea-panel--closed">
				<button className="btn btn-sm btn-primary right" onClick={this.openPanel}>View Ideas</button>
				<div className="clear"></div>
			</div>
		);
	}

	renderPanel = () => {
		return (
			<div className="idea-panel idea-panel--open">
				<div className="button-group right">
					<button className="btn btn-sm btn-success" onClick={this.postText}>Save</button>
					<button className="btn btn-sm btn-danger" onClick={this.closePanel}>Close</button>
				</div>
				<div className="clear"></div>
				<div className="form-group mt-2">
					<textarea className="form-control" rows="5" placeholder="Ideas for vision board, tasks to complete, goals to implement, etc" onChange={this.onChange} value={this.domain.addNote.form.text}/>
				</div>
			</div>
		);
	}

	render(){
		return(
			<React.Fragment>
				{this.ui.openIdeaPanel ? this.renderPanel() : this.renderButton()}
				<div className="clear"></div>
			</React.Fragment>
		);
	}
}

export default observer(IdeaPanel);