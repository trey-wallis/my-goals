import React, {Component} from 'react';

import Modal from '../Modal';
import RootStore from '../../store/RootStore';
import { observer } from 'mobx-react';

class DeleteVisionCategory extends Component {

	componentDidMount(){
		//Set the default value to the first selected
		if (RootStore.store.domain.visionData.categories.length !== 0)
			RootStore.store.ui.deleteVisionCategoryId = RootStore.store.domain.visionData.categories[0].id;
	}

	onSelectChange = (e) => {
		RootStore.store.ui.deleteVisionCategoryId = parseInt(e.target.value);
		console.log(e.target.value);
	}

	onDelete = () => {
		const deleteGoal = window.confirm("Are you sure you want to delete this item");
		if (deleteGoal){
			RootStore.store.domain.postDeleteVisionCategory(RootStore.store.ui.deleteVisionCategoryId);
		}
	}

	render(){
		const visionItems = RootStore.store.domain.visionData.categories.map((cat, i) => {
			return <option key={i} value={cat.id}>{cat.name}</option>
		});

		return(
			<Modal id="modal-delete-vision-category" title="Delete Vision Category">
				<h6 className="text-black">Vision Category</h6>
				<div className="form-group">
				<select className="form-control form-control-sm" value={RootStore.store.ui.deleteVisionCategoryId} onChange={(e)=>{this.onSelectChange(e)}}>
					{visionItems}
				</select>
				</div>
				<button className="btn btn-danger" onClick={this.onDelete}>Delete</button>
			</Modal>
		);
	}
}

export default observer(DeleteVisionCategory);