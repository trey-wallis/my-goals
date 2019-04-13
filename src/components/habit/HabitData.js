import React, { Component } from 'react';

import RootStore from '../../store/RootStore';
import HabitDataRow from './HabitDataRow';

class HabitData extends Component {
  render() {
    const rows = RootStore.store.domain.goalData.map((goal, i) => {
      if (goal.progress_tracking === 0)
  		  return <HabitDataRow key={i} goalId={goal.id} title={goal.name}/>
      else
        return '';
  	}); 
    return (
      <div>
      	{rows}
      </div>
    );
  }
}

export default HabitData;
