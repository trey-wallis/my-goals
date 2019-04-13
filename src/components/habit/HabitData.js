import React, { Component } from 'react';

import RootStore from '../../store/RootStore';
import HabitDataRow from './HabitDataRow';

class HabitData extends Component {
  render() {
  	const rows = RootStore.store.domain.habitData.map((habit, i) => {
  		const goalId = habit.goalId;
  		const goal = RootStore.store.domain.goalData.filter(goal => goal.id === goalId)[0];
  		return <HabitDataRow key={i} id={habit.id} title={goal.title} markedDates={habit.markedDates}/>
  	}); 
    return (
      <div>
      	{rows}
      </div>
    );
  }
}

export default HabitData;
