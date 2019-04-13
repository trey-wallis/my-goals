import React, { Component } from 'react';
import { observer} from 'mobx-react';

import RootStore from '../../store/RootStore';
import { upperCaseFirst, getDates } from '../../TextUtils';
import HabitDataRowItem from './HabitDataRowItem';

class HabitDataRow extends Component {
  render() {
  	const {goalId, title} = this.props;
  	const rows = getDates(RootStore.store.ui.habitDate).map((date, i) => {
      if (RootStore.store.domain.habitData.length === 0){
        return <HabitDataRowItem key={i} goalId={goalId} imgName="cross" fill="red" date={date}/>;
      } else {
        const habit = RootStore.store.domain.habitData.filter((habit, i) => {
          if (habit.goal_id === goalId){
            const utc = date.getTime() - (date.getTimezoneOffset() * 60000);
            if (utc === new Date(habit.date).getTime()){
              return true;
            }
          }
          return false; 
        })[0];
        if (habit !== undefined){
          return <HabitDataRowItem key={i} goalId={goalId} imgName="checkmark" fill="green" date={date}/>;
        } else { 
  			  return <HabitDataRowItem key={i} goalId={goalId} imgName="cross" fill="red" date={date} />;
        }
      }
  	});

    return (
      <div>
      	<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
	        	<h6 className="text-primary">{upperCaseFirst(title)}</h6>
            <div style={{display: 'flex', justifyContent: 'end', padding: '0px 15px'}}>
	      		{rows}
            </div>
        </div>
      </div>
    );
  }	
}

export default observer(HabitDataRow);