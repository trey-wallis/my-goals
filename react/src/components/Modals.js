import React, {Component} from 'react';
import {observer} from 'mobx-react';
import Pin from '../icons/pin.svg';
import Tag from '../icons/tags.svg';
import RootStore from '../store/RootStore';

class Modals extends Component {

	constructor(){
		super();
		const {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
	}

	onCategoryNameChange = (e) => {
		this.domain.categoryInputName = e.target.value; 
	}

	onSaveChanges = () => {
		this.domain.saveEditChanges();
	}

	renderModal(){
		return (
			<div className="modal fade" id="edit-modal" role="dialog">
				<div className="modal-dialog" role="document">
			    	<div className="modal-content">
			    		<div className="modal-header">
			    			<h5 className="modal-title">Edit</h5>
			    			<button type="button" className="close" data-dismiss="modal">
			          			<span>&times;</span>
			       			</button>
			      		</div>
			      		<div className="modal-body">
				      		<select className="form-control form-control-sm mb-2">
							  <option>Category 1</option>
							  <option>Category 2</option>
							</select>
							<h6>Category</h6>
			      			<div className="form-group mb-3">
			      				<div className="row">
			      					<div className="col-8">
			      						<input type="text" className="form-control" placeholder="Name" onChange={ (e) => {this.onCategoryNameChange(e)}}/>
			      					</div>
			      					<div className="col-2">
			      						<button className="btn btn-sm btn-danger">Delete</button>
			      					</div>
			      				</div>
			      			</div>
			      			<h6>Items</h6>
							<div className="row">
								<div className="col-9">
									 <div className="form-group">
									 	<input type="text" className="form-control-sm" placeholder="Name"/>
									 </div>
									 <div className="form-group">
									 	<input type="text" className="form-control-sm" placeholder="URL"/>
									 </div>
									 <div className="form-group">
									 	<input type="text" className="form-control-sm" placeholder="Description"/>
									 </div>
								</div>
								<div className="col-3 d-flex align-items-center">
									 <button className="btn btn-danger btn-sm">Delete</button>
								</div>
							</div>
			      		</div>
			      		<div className="modal-footer d-flex justify-content-between">
			      			<div>
			      				<img src={Tag} alt="Tag" className="icon--small mr-2"/>
			      				<img src={Pin} alt="pin" className="icon--small"/>
			      			</div>
			      			<div>
			      			<button type="button" className="btn btn-primary mr-2" onClick={this.onSaveChanges}>Save changes</button>
			        		<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
			        		</div>
			      		</div>
			    	</div>
			  	</div>
			</div>);
	}

	render(){
		return(
			<div>
				{this.domain.loggedIn ? this.renderModal() : ''}
			</div>);
	}
}

export default observer(Modals);