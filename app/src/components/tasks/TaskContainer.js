import React, { Component } from 'react';

import RootStore from '../../store/RootStore';
import TaskItem from './TaskItem';

import {observer} from 'mobx-react';

class TaskContainer extends Component {
  
  constructor(){
  	super();
  	const {domain} = RootStore.store;
  	this.domain = domain;
  } 

  renderTasks = () => {
    return this.domain.taskData.map((task, i) => {
      if (task.goal_id === this.props.goalId){
        return <TaskItem key={i} id={task.id} name={task.name} completed={task.completed}/>;
      }
      return '';
    });
  }

  onChange = (e) => {
    this.domain.addTask.form.text = e.target.value;
  }

  addTask = () => {
    this.domain.postAddTask(this.props.goalId);
  }

  render(){
    return (
    	<div>
    		{this.renderTasks()}
        <input type="text" className="form-control form-control-sm mt-4" placeholder="Enter a task name" onChange={this.onChange}/>
        <button className="btn btn-sm btn-secondary mt-1" onClick={this.addTask} value={this.domain.addTask.form.text}>Add Task</button>
    	</div>
    );
  }
}

export default observer(TaskContainer);