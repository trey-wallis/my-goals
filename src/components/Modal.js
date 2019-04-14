import React, {Component} from 'react';

class Modal extends Component {

	render(){
		return(
			<div className="modal fade" id={this.props.id} role="dialog">
				<div className="modal-dialog" role="document">
			    	<div className="modal-content">
			    		<div className="modal-header">
			    			<button type="button" className="close" data-dismiss="modal" onClick={this.props.onDismiss}>
			          			<span>&times;</span>
			       			</button>
			       			<div></div>
			      		</div>
			      		<div className="modal-body">
			      			{this.props.children}
			      		</div>
			      		<div className="modal-footer justify-content-between">
			      		</div>
			    	</div>
			  	</div>
			</div>
		);
	}
}

export default Modal;