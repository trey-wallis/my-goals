import React, { Component } from 'react';

import HabitDate from './HabitDate';
import HabitData from './HabitData';

class HabitContainer extends Component {
  render() {
    return (
      <div>
      	<div style={{float: 'right'}}>
        <HabitDate/>
        </div>
        <div style={{clear: 'both'}}></div>
        <HabitData/>
      </div>
    );
  }
}

export default HabitContainer;