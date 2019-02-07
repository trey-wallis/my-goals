import React, { Component } from 'react';
import '../css/App.css';
import Header from '../components/Header';
import GraphicBoard from '../components/GraphicBoard';
import InfoBoard from '../components/InfoBoard';

class App extends Component {

	constructor(){
		super();

		this.state = {
			user: "Trey"
		}
	}

	render(){
		return (
			<div className="App">
				<Header user={this.state.user} />
				<div className="row App__row">
					<GraphicBoard />
					<InfoBoard />
				</div>
			</div>);
	}
}

export default App;