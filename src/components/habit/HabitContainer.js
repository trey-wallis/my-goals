import React, { Component } from 'react';

import HabitDate from './HabitDate';
import HabitData from './HabitData';

class HabitContainer extends Component {
  render() {
    return (
      <div>
        <HabitDate/>
        <HabitData goalId={this.props.goalId} name={this.props.name}/>
      </div>
    );
  }
}

export default HabitContainer;