import React, {Component} from 'react';

import $ from 'jquery';

class Habits extends Component {

	componentDidMount(){
		$('.navbar-collapse').collapse('hide');
	}

	render(){
		return(
			<div className="Habits">
				<div className="container bg-white h-100">
					<div className="p-4">
						<h3 className="text-center">Habits</h3>
					</div>
				</div>
			</div>);
	}
}

export default Habits;