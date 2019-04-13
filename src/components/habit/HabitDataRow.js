import React, { Component } from 'react';
import { observer} from 'mobx-react';

import Store from '../../store/RootStore';
import { upperCaseFirst, getWeekDates } from '../../TextUtils';
import HabitDataRowItem from './HabitDataRowItem';

class HabitDataRow extends Component {
  render() {
  	const {id, title, markedDates} = this.props;
  	const rows = getWeekDates(Store.ui.habits.date).map((date, i) => {
  		const match = markedDates.filter(markedDate => {
			const marked = new Date(markedDate);
			return marked.getTime() === date.getTime()
  		})[0];
  		if (match !== undefined){
  			return <HabitDataRowItem key={i} id={id} imgName="checkmark" fill="green" date={date} checked={true} />;
  		}
  		else 
  			return <HabitDataRowItem key={i} id={id} imgName="cross" fill="red" date={date} checked={false} />;
  	});

    return (
      <div style={{padding: '0px 30px'}}>
      	<div style={{display: 'flex', justifyContent: 'space-between'}}>
	        <div style={{display: 'inline-block', height: '30px', padding: '12px 0px', fontSize: '1.1rem', width: '150px'}}>
	        	<div>{upperCaseFirst(title)}</div>
	      	</div>
	      	<div>
	      		{rows}
        	</div>
        </div>
      </div>
    );
  }	
}

export default observer(HabitDataRow);