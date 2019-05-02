import React, {Component} from 'react';

import SVG from '../SVG';

import $ from 'jquery';

import RootStore from '../store/RootStore';

import '../css/Title.css';

class Title extends Component {

	constructor(){
		super();
		const {ui, domain} = RootStore.store;
		this.ui = ui;
		this.domain = domain;
	}

	componentDidMount(){
		$('.navbar-collapse').collapse('hide');
		this.ui.navItemActive = 0;
	}

	render(){
		return(
			<div className="Title">
				<div className="Title__top bg-primary d-flex align-items-center justify-content-center">
					<div className="jumbotron bg--inherit m4 d-flex flex-column align-items-center">
						<h1 className="display-4 text-center text-white">What are my goals?</h1>
						<p className="lead w-50 text-tertiary">Meet the dynamic way and responsive way to expand your vision and track your SMART goals</p>
					</div>
				</div>
				<div className="Title__bottom row no-gutters align-items-center bg-white py-4">
					<div className="col-sm-4 d-flex flex-column align-items-center">
						<SVG className="m-2 icon--small" name="document-new"/>
						<h6 className="text-dark text-center">Vision Board</h6>
						<p className="w-50 text-center text-dark">Create a visual representation of your ideas and aspirations</p>
					</div>
					<div className="col-sm-4 d-flex flex-column align-items-center">
						<SVG className="m-2 icon--small" name="graph-bar"/>
						<h6 className="text-dark">Goals</h6>
						<p className="w-50 text-center text-dark">Create and actively track your SMART goals. Create subgoals
						and tasks to help manage your progress</p>
					</div>
					<div className="col-sm-4 d-flex flex-column align-items-center">
						<SVG className="m-2 icon--small" name="heart"/>
						<h6 className="text-dark">Habits</h6>
						<p className="w-50 text-center text-dark">Track and develop healthy habits that will help you achieve your goals</p>
					</div>
				</div>
			</div>);
	}
}

export default Title;