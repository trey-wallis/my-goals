import React, { Component } from 'react';

class HabitDateItem extends Component {
  render() {
    return (
      <div style={{display: 'inline-block', height: '30px', margin: '10px 8px', width: '30px'}}>
      	<div className="text-primary" style={{textAlign: 'center', fontSize: '0.9rem', textTransform: 'uppercase'}}>{this.props.dayName}</div>
      	<div className="text-primary" style={{textAlign: 'center', fontSize: '0.9rem'}}>{this.props.dayNumber}</div>
      </div>
    );
  }
}

export default HabitDateItem;