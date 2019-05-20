import React, { Component } from 'react';

import RootStore from '../../store/RootStore';
import {observer} from 'mobx-react';
class TaskItem extends Component {
  
  constructor(){
  	super();
  	const {domain} = RootStore.store;
  	this.domain = domain;
  } 

  complete = () => {
    this.domain.postCompleteTask(this.props.id);
  }

  delete = () => {
    const shouldDelete = window.confirm("Are you sure you want to delete this task?");
    if (shouldDelete)
      this.domain.postDeleteTask(this.props.id);
  }

  renderCompleteButton = () => {
    if (this.props.completed){
      return <button className="btn btn-sm btn-primary" onClick={this.complete}>Undo</button>;
    } else {
      return <button className="btn btn-sm btn-success" onClick={this.complete}>Complete</button>;
    }
  }

  render(){
    let textColor = "text-primary";
    if (this.props.completed){
        textColor = "text-success";
    }
    return (
    	<div>
        <div className={textColor}>{this.props.name}</div>
        <div className="button-group">
          {this.renderCompleteButton()}
          <button className="btn btn-sm btn-danger" onClick={this.delete}>Delete</button>
        </div>
    	</div>
    );
  }
}

export default observer(TaskItem);