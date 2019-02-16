import React, {Component} from 'react';
import DocumentIcon from '../icons/document-new.svg'
import GraphicIcon from '../icons/graph-bar.svg';
import HeartIcon from '../icons/heart.svg';

class Title extends Component {


	render(){
		const background_style = {
			height: '65%'
		}

		const row_style = {
			height: '35%'
		}

		return(
			<div className="menu">
				<div className="wrapper h-100">
					<div className="background bg-primary d-flex align-items-center justify-content-center" style={background_style}>
						<div className="jumbotron bg--inherit m4 d-flex flex-column align-items-center">
						<h1 className="display-4">What are my goals?</h1>
						<p className="lead w-50">Meet the dynamic way and responsive way to expand your vision and track your SMART goals</p>
						</div>
					</div>
					<div className="row no-gutters align-items-center" style={row_style}>
						<div className="col-sm-4 d-flex flex-column align-items-center">
							<img src={DocumentIcon} className="mb-2 icon--small" alt="new document"/>
							<h6>Vision Board</h6>
							<p className="w-50 text-center">Create a visual representation of your ideas and aspirations</p>
						</div>
						<div className="col-sm-4 d-flex flex-column align-items-center">
							<img src={GraphicIcon} alt="graph bar" className="mb-2 icon--small"/>
							<h6>Goals</h6>
							<p className="w-50 text-center">Create and actively track your SMART goals. Create subgoals
							and tasks to help manage your progress</p>
						</div>
						<div className="col-sm-4 d-flex flex-column align-items-center">
							<img src={HeartIcon} alt="heart" className="mb-2 icon--small"/>
							<h6>Habits</h6>
							<p className="w-50 text-center">Track and develop healthy habits that will help you achieve your goals</p>
						</div>
					</div>
				</div>
			</div>);
	}
}

export default Title;