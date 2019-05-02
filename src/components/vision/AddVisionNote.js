import React, {Component} from 'react';
import {observer} from 'mobx-react';

import RootStore from '../../store/RootStore';

import Modal from '../Modal'

class AddVisionNote extends Component {

	constructor(){
		super();
		const {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
		this.domain.addVisionNoteForm.text = "";
		this.domain.addVisionNoteForm.response = "";
	}

	onTextChange = (e) => {
		this.domain.addVisionNoteForm.text = e.target.value;
	}

	onSaveNote = () => {
		this.domain.postAddVisionNote();
	}

	onClearText = () => {
		this.domain.addVisionNoteForm.text = "";
	}

	render(){
		return(
			<Modal id="modal-add-vision-note" title="Add Vision Note">
				<div className="form-group">
					<textarea className="form-control" rows="5" placeholder="Ideas, goals, or plans about your vision item" onChange={this.onTextChange} value={this.domain.addVisionNoteForm.text}/>
				</div>
				<button type="button" className="btn btn-primary mr-2 mb-2" onClick={this.onSaveNote}>Save Note</button>
				<button type="button" className="btn btn-danger mb-2" onClick={this.onClearText}>Clear Text</button>
				<div className="text-danger">{this.domain.addVisionNoteForm.response}</div>
			</Modal>
		);
	}
}

export default observer(AddVisionNote);