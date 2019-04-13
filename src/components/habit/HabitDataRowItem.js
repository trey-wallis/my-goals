import React, { Component } from 'react';
import SVG from '../../SVG';
import Store from '../../store/RootStore';

class HabitDataRowItem extends Component {

	clickedImage = (id, date, checked) => {
		const clicked = Store.domain.habitData.filter(habit => habit.id === id)[0];
		if (checked === true){
			const filtered = clicked.markedDates.filter(markedDate => {
				return markedDate.getTime() !== date.getTime();
			});
			clicked.markedDates = filtered;
		} else {
			clicked.markedDates.push(date);
			console.log("Adding date", id, date);
		}
	}

	render() {
		const {id, imgName, fill, date, checked} = this.props;
		return (
			<div style={{display: 'inline-block', textAlign: 'center', margin: '10px 30px', width: '30px'}} onClick={()=>{this.clickedImage(id, date, checked)}}>
				<SVG className="hover" name={imgName} fill={fill}/>
	    	</div>
		);
	}
}

export default HabitDataRowItem;