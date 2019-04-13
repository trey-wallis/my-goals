import React, { Component } from 'react';

class HabitDateItem extends Component {
  render() {
    return (
      <div style={{display: 'inline-block', height: '30px', margin: '10px 30px', width: '30px'}}>
      	<div style={{textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase'}}>{this.props.dayName}</div>
      	<div style={{textAlign: 'center', fontWeight: 'bold'}}>{this.props.dayNumber}</div>
      </div>
    );
  }
}

export default HabitDateItem;