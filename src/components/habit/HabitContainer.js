import React, { Component } from 'react';

import HabitDate from './HabitDate';
import HabitData from './HabitData';

class HabitContainer extends Component {
  render() {
    return (
      <div>
        <HabitDate/>
        <HabitData/>
      </div>
    );
  }
}

export default HabitContainer;