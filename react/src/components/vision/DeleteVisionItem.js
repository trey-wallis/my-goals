import React, {Component} from 'react';

import Modal from '../Modal';
import RootStore from '../../store/RootStore';
import { observer } from 'mobx-react';

class DeleteVisionItem extends Component {

	componentDidMount(){
		//Set the default value to the first selected
		if (RootStore.store.domain.visionData.items.length !== 0)
			RootStore.store.ui.deleteVisionItemId = RootStore.store.domain.visionData.items[0].id;
	}

	onSelectChange = (e) => {
		RootStore.store.ui.deleteVisionItemId = parseInt(e.target.value);
		console.log(e.target.value);
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
			<Modal id="modal-delete-vision-item" title="Delete Vision Item">
				<h6 className="text-black">Vision Item</h6>
				<div className="form-group">
				<select className="form-control form-control-sm" value={RootStore.store.ui.deleteVisionItemId} onChange={(e)=>{this.onSelectChange(e)}}>
					{visionItems}
				</select>
				</div>
				<button className="btn btn-danger" onClick={this.onDelete}>Delete</button>
			</Modal>
		);
	}
}

export default observer(DeleteVisionItem);