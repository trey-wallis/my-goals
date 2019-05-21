import React, {Component} from 'react';

import SVG from '../SVG';

import $ from 'jquery';

import RootStore from '../store/RootStore';

import './Title.css';

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
			<div>
				<div className="bg-primary d-flex align-items-center justify-content-center divide-top">
					<div className="jumbotron bg--inherit d-flex flex-column align-items-center">
						<h1 className="display-4 text-center text-white">What are my goals?</h1>
						<p className="lead w-50 text-light">Meet the dynamic way and responsive way to expand your vision and track your SMART goals</p>
					</div>
				</div>
				<div className="row no-gutters align-items-center bg-white text-black py-4 divide-bottom">
					<div className="col-sm-4 d-flex flex-column align-items-center text-center">
						<SVG className="m-2 icon--sm" name="document-new"/>
						<h6>Vision Board</h6>
						<p className="w-50">Create a visual representation of your ideas and aspirations</p>
					</div>
					<div className="col-sm-4 d-flex flex-column align-items-center text-center">
						<SVG className="m-2 icon--sm" name="graph-bar"/>
						<h6>Goals</h6>
						<p className="w-50">Create and actively track your SMART goals. Create subgoals
						and tasks to help manage your progress</p>
					</div>
					<div className="col-sm-4 d-flex flex-column align-items-center text-center">
						<SVG className="m-2 icon--sm" name="heart"/>
						<h6>Habits</h6>
						<p className="w-50">Track and develop healthy habits that will help you achieve your goals</p>
					</div>
				</div>
			</div>);
	}
}

export default Title;