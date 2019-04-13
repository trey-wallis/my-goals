import React, { Component } from 'react';

import SVG from '../../SVG';
import RootStore from '../../store/RootStore'; 

class HabitDateChevron extends Component {

	clickedImage = (left) => {
		const date = RootStore.store.ui.habitDate;
		if (left === true){
			date.setDate(RootStore.store.ui.habitDate.getDate() - 4);
			 RootStore.store.ui.habitDate = new Date(date);
		} else{
			date.setDate(RootStore.store.ui.habitDate.getDate() + 4);
			RootStore.store.ui.habitDate = new Date(date);
		}
	}

	render(){
		const {imgName, fill, left} = this.props;
		return (
		    <div style={{display: 'inline-block', height: '20px', margin: '10px 0px', width: '20px'}} onClick={()=>{this.clickedImage(left)}}>
				<SVG className="light-hover" name={imgName} fill={fill} />
			</div>
		);
	}
}

export default HabitDateChevron;