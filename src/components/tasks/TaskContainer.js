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
      return <TaskItem key={i} id={task.id} name={task.name} completed={task.completed}/>;
    });
  }

  render(){
    return (
    	<div>
    		{this.renderTasks()}
    	</div>
    );
  }
}

export default observer(TaskContainer);