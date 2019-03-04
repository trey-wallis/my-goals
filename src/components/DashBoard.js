import React, {Component} from 'react';

import '../css/DashBoard.css';

import $ from 'jquery';
import RootStore from '../store/RootStore';
class DashBoard extends Component {

	componentDidMount(){
		$('.navbar-collapse').collapse('hide');
	}

	render(){
		return(
			<div className="container-fluid--full container bg-white d-flex flex-column align-items-center text-primary">
				<div className="w-100 p-4 text-center mb-1">
					<h3 className="text-dark">Dashboard</h3>
					<h6 className="lead">Welcome {RootStore.store.domain.displayName}</h6>
				</div>
				<div className="card w-100 mb-3">
					<div className="card-header text-secondary bg-primary">Upcoming Goals</div>
					<div className="card-body">None</div>
				</div>
				<div className="card w-100">
					<div className="card-header text-secondary bg-primary">Habit Log</div>
					<div className="card-body">None</div>
				</div>
		</div>);
	}
}

export default DashBoard;