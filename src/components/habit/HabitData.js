import React, { Component } from 'react';
import { observer} from 'mobx-react';

import RootStore from '../../store/RootStore';
import { getDates } from '../../TextUtils';
import HabitDataItem from './HabitDataItem';

class HabitData extends Component {
  render() {
  	const {goalId} = this.props;
  	const rows = getDates(RootStore.store.ui.habitDate).map((date, i) => {
      if (RootStore.store.domain.habitData.length === 0){
        return <HabitDataItem key={i} goalId={goalId} imgName="cross" fill="red" date={date}/>;
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
          return <HabitDataItem key={i} goalId={goalId} imgName="checkmark" fill="green" date={date}/>;
        } else { 
  			  return <HabitDataItem key={i} goalId={goalId} imgName="cross" fill="red" date={date} />;
        }
      }
  	});

    return (
      <div>
          <div style={{display: 'flex', justifyContent: 'end'}}>
	      	  {rows}
          </div>
      </div>
    );
  }	
}

export default observer(HabitData);