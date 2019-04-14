import React, {Component} from 'react';

import Modal from '../Modal';
import RootStore from '../../store/RootStore';
import { observer } from 'mobx-react';

class DeleteVisionItem extends Component {

	onDismiss = () => {
		console.log("Dismiss");
	}

	onSelectChange = (e) => {
		RootStore.store.ui.deleteVisionItemId = parseInt(e.target.value);
	}

	onDelete = () => {
		const deleteGoal = window.confirm("Are you sure you want to delete this item");
		if (deleteGoal){
			RootStore.store.domain.postDeleteVisionItem(RootStore.store.ui.deleteVisionItemId);
		}
	}

	render(){
		const visionItems = RootStore.store.domain.visionData.items.map((item, i) => {
			return <option key={i} value={item.id}>{item.title}</option>
		});

		return(
			<Modal id="modal-delete-vision-item" onDismiss={this.onDismiss}>
				<h6>Vision Item</h6>
				<select className="form-control form-control-sm" value={RootStore.store.ui.deleteVisionItemId} onChange={(e)=>{this.onSelectChange(e)}}>
					{visionItems}
				</select>
				<button className="btn btn-danger mt-2" onClick={this.onDelete}>Delete</button>
			</Modal>
		);
	}
}

export default observer(DeleteVisionItem);