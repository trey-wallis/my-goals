import React, { Component } from 'react';

import RootStore from '../../store/RootStore';
import {observer} from 'mobx-react';
import SVG from '../../SVG';
import './TaskItem.css';

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
    	<div className="d-flex justify-content-between">
        <div className={textColor}>{this.props.name}</div>
        <div>
          <div className="icon" onClick={this.complete}>
            <SVG name="trophy" className="icon-item"/>
          </div>
          <div className="icon" onClick={this.delete}>
            <SVG name="cross" className="icon-item"/>
          </div>
        </div>
    	</div>
    );
  }
}

export default observer(TaskItem);