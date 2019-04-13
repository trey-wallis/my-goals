import React, {Component} from 'react';

import {observer} from 'mobx-react';
import DropDown from './DropDown';

class DropDownHabits extends Component {

	render(){	
		return (
			<DropDown title="My Habits">
			</DropDown>
		);
	}
}

export default observer(DropDownHabits);