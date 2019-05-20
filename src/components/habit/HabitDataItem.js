import React, { Component } from 'react';
import SVG from '../../SVG';
import Store from '../../store/RootStore';

class HabitDataItem extends Component {

	clickedImage = (goalId, date) => {
		Store.store.domain.postHabit(goalId, date);
	}

	render() {
		const {goalId, imgName, fill, date} = this.props;
		return (
			<div style={{textAlign: 'center', margin: '10px 8px', width: '30px'}} onClick={()=>{this.clickedImage(goalId,  date)}}>
				<SVG className="light-hover" name={imgName} fill={fill}/>
	    	</div>
		);
	}
}

export default HabitDataItem;