import React, {Component} from 'react';

import $ from 'jquery';

class Habits extends Component {

	componentDidMount(){
		$('.navbar-collapse').collapse('hide');
	}

	render(){
		return(
			<div>Habits</div>);
	}
}

export default Habits;