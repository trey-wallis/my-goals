import React, {Component} from 'react';
import {observer} from 'mobx-react';

import RootStore from '../../store/RootStore';

class AddVisionNote extends Component {

	constructor(){
		super();
		const {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
		this.domain.addVisionNoteText = "";
		this.domain.addVisionNoteResponse = "";
	}

	onTextChange = (e) => {
		this.domain.addVisionNoteText = e.target.value;
	}

	onSaveNote = () => {
		this.domain.postAddVisionNote();
	}

	render(){
		return(
			<div className="modal fade" id="modal-add-vision-note" role="dialog">
				<div className="modal-dialog" role="document">
			    	<div className="modal-content">
			    		<div className="modal-header">
			    			<h5 className="modal-title">Vision Board Note</h5>
			    			<button type="button" className="close" data-dismiss="modal">
			          			<span>&times;</span>
			       			</button>
			      		</div>
			      		<div className="modal-body">
							<div className="form-group">
								<textarea className="form-control" rows="5" placeholder="Ideas, goals, or plans about your vision item" onChange={this.onTextChange} value={this.domain.addVisionNoteText}/>
							</div>
						</div>
			      		<div className="modal-footer justify-content-between">
			      			<div className="text-danger mt-1">{this.domain.addVisionNoteResponse}</div>
			      			<div>
				      			<button type="button" className="btn btn-primary mr-2" onClick={this.onSaveNote}>Save Note</button>
				        		<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
			        		</div>
			      		</div>
			    	</div>
			  	</div>
			</div>);
	}
}

export default observer(AddVisionNote);